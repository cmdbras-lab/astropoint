# Compilar AstroPointer no Windows

A compilação normal é feita automaticamente no GitHub Actions. Para desenvolvimento local:

1. Instalar Android Studio.
2. Clonar ou descarregar este repositório.
3. Abrir a raiz do projeto no Android Studio.
4. Instalar Android SDK 35 se for solicitado.
5. Usar JDK 17 e Gradle 8.9.
6. Ligar o telemóvel por USB com Depuração USB ativa ou usar um emulador.
7. Executar a app pelo Android Studio.

O APK de debug fica em `app/build/outputs/apk/debug/app-debug.apk`.

## Teste de bancada

- Confirmar GPS em **Agora**.
- Abrir **Mira** e selecionar Lua ou um planeta brilhante.
- Rodar/inclinar o telefone e verificar AZ/ALT em tempo real.
- Longe de metal/ímanes, confirmar que o azimute muda de forma contínua.
- Só depois montar no tripé e usar **Calibrar eixo óptico**.
