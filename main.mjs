// main.mjs
import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './src/database/index.js';
import { registerHandlers } from './src/ipc/registerHandlers.js';
import { unregisterKeyboardShortcuts } from './src/ipc/keyboardShortcuts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'preload.cjs'),
      nodeIntegration: true,
      contextIsolation: true,
    }
  });

  const isDev = process.env.ELECTRON_IS_DEV === 'true';

  if (isDev) {
    console.log('Loading from localhost:3000 (Development)');
    win.loadURL('http://localhost:3000');
  } else {
    console.log('Loading from dist/index.html (Production)');
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  }
}

app.whenReady().then(async () => {
  try {
    await db.migrate.latest();
    console.log('Database migrations completed successfully');
  } catch (error) {
    console.error('Error running database migrations:', error);
  }
  
  createWindow();
  registerHandlers();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  unregisterKeyboardShortcuts();
});