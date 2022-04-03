const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');

// 'darwin' for Mac behaves differently
const { platform } = process;
let mainWindow;

// Create main window
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 940,
    minHeight: 560,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
    },
  });
  // load in HTML
  mainWindow.loadFile('./src/index.html');
  mainWindow.setBackgroundColor('#343848');

  // Minimize App
  ipcMain.on('app:minimize', () => {
    mainWindow.minimize();
  });

  // Maximize App
  ipcMain.on('app:maximize-restore', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  });

  // Update Maximize/Restore Icon for Renderer
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('isMaximized');
  });
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('isRestored');
  });

  // Close App
  ipcMain.on('app:close', () => {
    mainWindow.close();
  });

  // Hotkeys
  globalShortcut.register('CommandOrControl+R', () => {
    mainWindow.reload();
  });
};

// When app is ready, create new window
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit app on all windows close for Mac
app.on('window-all-closed', () => {
  if (platform !== 'darwin') app.quit();
});
