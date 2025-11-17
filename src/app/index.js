// Importacion de Electron
const { app, BrowserWindow, ipcMain } = require('electron');

/* Libreria de Discord Rich Presence */ /*
const RPC = require('discord-rpc');
const clientID = 'APP-ID';
*/

/* Variable con el Estado de Rich Presence */
let DiscordEstado = "Playing Catcher's Arcade!";

/* Configuracion del Rich Presence */ /*
const DiscordRPC = new RPC.Client( { transport: 'ipc' } );
DiscordRPC.on('ready', () => {
    DiscordRPC.setActivity({
        details: "Playing Catcher's",
        state: DiscordEstado,
        largeImageKey: './discordRPC.png',
        startTimestamp: new Date(),
        instance: false,
    });
});
*/

/* Iniciar Discord Rich Presence */ /*
DiscordRPC.login({ clientID })
    .catch(console.error);
*/

/* Crear Ventana Principal */
const crearVentana = () => {
    const ventanaPrincipal = new BrowserWindow({
        width: 640,
        height: 360,
        icon: './icon.png',
        useContentSize: true,
        autoHideMenuBar: true,
        webPreferences: {
            sandbox: true,
            nodeIntegration: false,
            contextIsolation: true,
        },
        frame: false,
        resizable: false
    });
    
    // Cargar Archivo HTML de Catchers
    ventanaPrincipal.loadFile('../html/index.html')
        .catch(err => {
            console.error("Error cargando Catcher's: ", err);
        });
        
    // Aqui ira el Script para cambiar el DiscordEstado para RPC
    
    /* Eventos de Cierre */
    ventanaPrincipal.on('destroy', (evento) => {
        // Evita el cierre por defecto
        evento.preventDefault();
        // Destruye por completo el proceso
        ventanaPrincipal.destroy();
    });
}

/* Manejo de la App */
app.whenReady().then( () => {
    crearVentana()
        /*
        app.on('activate' () => { /* Evento de Creacion */ /*
            if (BrowserWindow.getAllWindows().length === 0) {
                crearVentana();
            }   
        }); */
        app.on('close', (evento) => { /* Evento de Cierre */
            evento.preventDefault();
            win.destroy();
        })
});

/* Ingeniería inversa de Electron de turbowarp */
app.on('web-contents-created', (event, contents) => {
    contents.setWindowOpenHandler((details) => {
        setImmediate(() => {
            openLink(details.url);
        });
        return {action: 'deny'};
    });
    contents.on('will-navigate', (e, url) => {
        e.preventDefault();
    });
    contents.on('before-input-event', (e, input) => {
        const window = BrowserWindow.fromWebContents(contents);
        if (!window || input.type !== "keyDown") return;
        /*
        if (input.key === 'F11' || (input.key === 'Enter' && input.alt)) {
            window.setFullScreen(!window.isFullScreen());
        } else if (input.key === 'Escape' && window.isFullScreen()) {
            window.setFullScreen(false);
        }*/
    });
});

app.on('window-all-closed', (evento) => {
    evento.preventDefault();
    // Solo Windows y Linux
    app.quit()
});
