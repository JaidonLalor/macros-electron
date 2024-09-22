// main.mjs
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './src/database/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
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

// IPC Handlers
ipcMain.handle('db:query', async (event, sql, params) => {
  try {
    const result = await db.raw(sql, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
});

ipcMain.handle('db:insert', async (event, table, data) => {
  try {
    const result = await db(table).insert(data);
    return result;
  } catch (error) {
    console.error('Database insert error:', error);
    throw error;
  }
});

ipcMain.handle('db:update', async (event, table, data, where) => {
  try {
    const result = await db(table).where(where).update(data);
    return result;
  } catch (error) {
    console.error('Database update error:', error);
    throw error;
  }
});

ipcMain.handle('db:delete', async (event, table, where) => {
  try {
    const result = await db(table).where(where).del();
    return result;
  } catch (error) {
    console.error('Database delete error:', error);
    throw error;
  }
});