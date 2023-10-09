## Bot de Música para Discord em Node.js

Este é um projeto em Node.js que apresenta um bot simples de música para servidores Discord. O bot é projetado para facilitar a reprodução de músicas a partir de uma variedade de fontes, como YouTube, Spotify e muito mais, diretamente nos canais de voz do Discord.

### Funcionalidades
 - **Reprodução de Música**: O bot oferece uma maneira fácil de tocar músicas a partir de links de playlists, links de músicas individuais e até mesmo pesquisas, proporcionando uma experiência musical sem complicações.

 - **Comandos Intuitivos**: Os comandos são simples e intuitivos, permitindo aos usuários controlar a reprodução das músicas.

 ### Como usar

 1. Clone o repositorio
    ```bash
    git clone https://github.com/mxrqz/discord-music-bot.git
    ```

2.  Instale as bibliotecas
    ```bash
    npm install
    ```

3. Edite o arquivo `config.json` com as informações necessárias, incluindo o token do Discord, o ID do cliente do bot e o ID do servidor.
    ```json
    {
        "TOKEN": "DISCORD_TOKEN",
        "CLIENT_ID": "CLIENT_ID_DO_BOT",
        "GUILD_ID": "ID_DO_SERVER"
    }
    ```

4. Carregue os comandos no servidor
    ```bash
    node index load
    ```

5. Inicie o bot
     ```bash
    node index
    ```

6. No Discord utilize o `/play musica` para reproduzir as musicas/playlists.

### Observações

- Estou utilizando o `ytdl-core@4.10.0` devido a problemas na hora de reproduzir as músicas nas versões mais recentes.

- É necessário o `ffmpeg` para o bot funcionar.