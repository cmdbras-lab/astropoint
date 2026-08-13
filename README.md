# AstroPointer

Aplicação Android autónoma para localizar e apontar instrumentos de observação para astros e fenómenos astronómicos usando GPS e sensores nativos do telemóvel.

## v0.1.0

Esta primeira versão nasce do módulo Eclipse GPS e já inclui:

- GPS nativo Android, sem Home Assistant.
- orientação nativa por rotation vector;
- correção da declinação magnética para norte verdadeiro;
- mira em azimute/altitude com indicação de rotação e elevação;
- vibração quando o alinhamento entra na tolerância;
- calibração do eixo óptico telemóvel + binóculos/telescópio;
- Sol, Lua e planetas visíveis no momento;
- eclipses solares de 12/08/2026 e 02/08/2027;
- mapa com GPS, coordenadas manuais e seleção por toque;
- faixa de totalidade e linha central.

## Compilação automática

O workflow `.github/workflows/android-build.yml` compila o APK no GitHub Actions com JDK 17, Gradle 8.9, Android Gradle Plugin 8.7.3 e API 35. O APK de teste é publicado como artefacto da execução.

## Estado de rede/offline

A interface está integrada no APK. Nesta v0.1, Leaflet, Astronomy Engine 2.1.19 e os mosaicos OpenStreetMap ainda dependem de Internet. Uma próxima versão deverá incorporar as bibliotecas astronómicas e cartográficas essenciais localmente.

## Segurança solar

Nunca observar o Sol por binóculos ou telescópio sem filtro solar próprio colocado à frente das objetivas. A mira é um auxiliar de apontamento, não um dispositivo de proteção ocular.

## Fontes e componentes

- Astronomy Engine — Don Cross / cosinekitty — MIT.
- Leaflet — BSD-2-Clause.
- OpenStreetMap — © OpenStreetMap contributors.
- Dados da faixa de eclipses — tabelas de trajetória NASA GSFC / Fred Espenak usadas no protótipo Eclipse GPS.

## Roteiro

O projeto será expandido para conjunções, oposições, eclipses lunares, chuvas de meteoros, cometas, estrelas/objetos de céu profundo e, posteriormente, satélites/ISS, reutilizando o mesmo sistema de mira do tripé.
