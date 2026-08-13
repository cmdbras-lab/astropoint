package pt.carlosbras.astropointer;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.hardware.GeomagneticField;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.os.CancellationSignal;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONObject;

import java.util.Locale;

public class MainActivity extends Activity implements SensorEventListener, LocationListener {
    private static final int REQ_LOCATION = 1001;
    private WebView webView;
    private SensorManager sensorManager;
    private Sensor rotationSensor;
    private LocationManager locationManager;
    private Location lastLocation;
    private JSONObject lastOrientation;
    private boolean pageReady = false;
    private boolean sensorsActive = false;
    private final float[] rotationMatrix = new float[9];
    private SharedPreferences prefs;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        rotationSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR);
        if (rotationSensor == null) rotationSensor = sensorManager.getDefaultSensor(Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR);
        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        prefs = getSharedPreferences("astropointer", MODE_PRIVATE);

        webView = new WebView(this);
        webView.setBackgroundColor(0xFF08111F);
        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        s.setAllowFileAccess(true);
        s.setAllowContentAccess(false);
        s.setBuiltInZoomControls(false);
        s.setDisplayZoomControls(false);
        webView.addJavascriptInterface(new NativeBridge(), "AndroidBridge");
        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient() {
            @Override public void onPageFinished(WebView view, String url) {
                pageReady = true;
                emitLocation(lastLocation);
                emitOrientation(lastOrientation);
                emitNativeStatus();
            }
            @Override public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return !url.startsWith("file:///android_asset/");
            }
        });
        setContentView(webView);
        webView.loadUrl("file:///android_asset/www/index.html");
        ensureLocationPermission();
    }

    @Override protected void onResume() {
        super.onResume();
        startSensors();
        startLocationUpdates();
    }

    @Override protected void onPause() {
        super.onPause();
        sensorManager.unregisterListener(this);
        sensorsActive = false;
        if (hasLocationPermission()) {
            try { locationManager.removeUpdates(this); } catch (Exception ignored) {}
        }
    }

    @Override protected void onDestroy() {
        if (webView != null) {
            webView.removeJavascriptInterface("AndroidBridge");
            webView.destroy();
        }
        super.onDestroy();
    }

    private boolean hasLocationPermission() {
        return checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED ||
               checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED;
    }

    private void ensureLocationPermission() {
        if (!hasLocationPermission()) {
            requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION}, REQ_LOCATION);
        } else {
            startLocationUpdates();
        }
    }

    @Override public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQ_LOCATION) {
            startLocationUpdates();
            emitNativeStatus();
        }
    }

    private void startLocationUpdates() {
        if (!hasLocationPermission()) return;
        try {
            if (locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
                locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 1000L, 0f, this);
                Location l = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                if (l != null) onLocationChanged(l);
            }
            if (locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)) {
                locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 3000L, 2f, this);
                Location l = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
                if (l != null && (lastLocation == null || l.getAccuracy() < lastLocation.getAccuracy())) onLocationChanged(l);
            }
        } catch (SecurityException ignored) {}
    }

    private void requestFreshLocation() {
        if (!hasLocationPermission()) {
            runOnUiThread(this::ensureLocationPermission);
            return;
        }
        if (Build.VERSION.SDK_INT >= 30) {
            try {
                String provider = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER) ? LocationManager.GPS_PROVIDER : LocationManager.NETWORK_PROVIDER;
                locationManager.getCurrentLocation(provider, (CancellationSignal) null, getMainExecutor(), location -> {
                    if (location != null) onLocationChanged(location);
                });
            } catch (Exception ignored) { startLocationUpdates(); }
        } else startLocationUpdates();
    }

    private void startSensors() {
        if (rotationSensor != null && !sensorsActive) {
            sensorManager.registerListener(this, rotationSensor, SensorManager.SENSOR_DELAY_GAME);
            sensorsActive = true;
        }
    }

    @Override public void onLocationChanged(Location location) {
        if (location == null) return;
        if (lastLocation == null || location.getTime() >= lastLocation.getTime() || location.getAccuracy() < lastLocation.getAccuracy()) {
            lastLocation = location;
            emitLocation(location);
        }
    }


    @Override public void onProviderEnabled(String provider) {}
    @Override public void onProviderDisabled(String provider) {}
    @Deprecated @Override public void onStatusChanged(String provider, int status, Bundle extras) {}

    @Override public void onSensorChanged(SensorEvent event) {
        if (event.sensor.getType() != Sensor.TYPE_ROTATION_VECTOR && event.sensor.getType() != Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR) return;
        SensorManager.getRotationMatrixFromVector(rotationMatrix, event.values);

        // The physical top edge of the phone is +Y in Android's device coordinates.
        // R transforms that unit vector to the earth frame: X=east, Y=magnetic north, Z=up.
        float east = rotationMatrix[1];
        float north = rotationMatrix[4];
        float up = rotationMatrix[7];
        double norm = Math.sqrt(east*east + north*north + up*up);
        if (norm < 1e-6) return;
        double azMag = Math.toDegrees(Math.atan2(east, north));
        if (azMag < 0) azMag += 360.0;
        double altitude = Math.toDegrees(Math.asin(up / norm));

        float declination = 0f;
        if (lastLocation != null) {
            float h = lastLocation.hasAltitude() ? (float) lastLocation.getAltitude() : 0f;
            GeomagneticField field = new GeomagneticField((float) lastLocation.getLatitude(), (float) lastLocation.getLongitude(), h, System.currentTimeMillis());
            declination = field.getDeclination();
        }
        double azTrue = azMag + declination;
        azTrue = ((azTrue % 360.0) + 360.0) % 360.0;

        try {
            JSONObject o = new JSONObject();
            o.put("azimuthTrue", azTrue);
            o.put("azimuthMagnetic", azMag);
            o.put("altitude", altitude);
            o.put("declination", declination);
            o.put("accuracy", sensorAccuracyLabel(lastSensorAccuracy));
            o.put("sensor", rotationSensor.getType() == Sensor.TYPE_ROTATION_VECTOR ? "rotation_vector" : "geomagnetic_rotation_vector");
            lastOrientation = o;
            emitOrientation(o);
        } catch (Exception ignored) {}
    }

    private int lastSensorAccuracy = SensorManager.SENSOR_STATUS_UNRELIABLE;
    @Override public void onAccuracyChanged(Sensor sensor, int accuracy) {
        lastSensorAccuracy = accuracy;
        emitNativeStatus();
    }

    private String sensorAccuracyLabel(int accuracy) {
        switch (accuracy) {
            case SensorManager.SENSOR_STATUS_ACCURACY_HIGH: return "alta";
            case SensorManager.SENSOR_STATUS_ACCURACY_MEDIUM: return "média";
            case SensorManager.SENSOR_STATUS_ACCURACY_LOW: return "baixa";
            default: return "não fiável";
        }
    }

    private void emitLocation(Location l) {
        if (!pageReady || l == null || webView == null) return;
        try {
            JSONObject o = new JSONObject();
            o.put("latitude", l.getLatitude());
            o.put("longitude", l.getLongitude());
            o.put("accuracy", l.hasAccuracy() ? l.getAccuracy() : JSONObject.NULL);
            o.put("altitude", l.hasAltitude() ? l.getAltitude() : JSONObject.NULL);
            o.put("time", l.getTime());
            o.put("provider", l.getProvider());
            callJs("window.onNativeLocation && window.onNativeLocation(" + o.toString() + ")");
        } catch (Exception ignored) {}
    }

    private void emitOrientation(JSONObject o) {
        if (!pageReady || o == null || webView == null) return;
        callJs("window.onNativeOrientation && window.onNativeOrientation(" + o.toString() + ")");
    }

    private void emitNativeStatus() {
        if (!pageReady || webView == null) return;
        try {
            JSONObject o = new JSONObject();
            o.put("locationPermission", hasLocationPermission());
            o.put("rotationSensor", rotationSensor != null);
            o.put("sensorAccuracy", sensorAccuracyLabel(lastSensorAccuracy));
            callJs("window.onNativeStatus && window.onNativeStatus(" + o.toString() + ")");
        } catch (Exception ignored) {}
    }

    private void callJs(String js) {
        if (webView == null) return;
        runOnUiThread(() -> webView.evaluateJavascript(js, null));
    }

    public class NativeBridge {
        @JavascriptInterface public void requestLocation() { requestFreshLocation(); }
        @JavascriptInterface public void startOrientation() { runOnUiThread(MainActivity.this::startSensors); }
        @JavascriptInterface public void vibrate(int ms) {
            Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
            if (v == null || !v.hasVibrator()) return;
            int duration = Math.max(10, Math.min(ms, 500));
            if (Build.VERSION.SDK_INT >= 26) v.vibrate(VibrationEffect.createOneShot(duration, VibrationEffect.DEFAULT_AMPLITUDE));
            else v.vibrate(duration);
        }
        @JavascriptInterface public String getCalibration() {
            try {
                JSONObject o = new JSONObject();
                o.put("azOffset", prefs.getFloat("azOffset", 0f));
                o.put("altOffset", prefs.getFloat("altOffset", 0f));
                o.put("valid", prefs.getBoolean("calValid", false));
                return o.toString();
            } catch (Exception e) { return "{\"valid\":false}"; }
        }
        @JavascriptInterface public void saveCalibration(double azOffset, double altOffset) {
            prefs.edit().putFloat("azOffset", (float) azOffset).putFloat("altOffset", (float) altOffset).putBoolean("calValid", true).apply();
        }
        @JavascriptInterface public void clearCalibration() {
            prefs.edit().remove("azOffset").remove("altOffset").putBoolean("calValid", false).apply();
        }
        @JavascriptInterface public String appVersion() { return "0.1.0"; }
    }
}
