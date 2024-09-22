const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
  });

  const isDev = process.env.ELECTRON_IS_DEV === 'true'; //Conditionally run dev vs production mode. Set in package.json

  if (isDev) {
    console.log('Loading from localhost:3000 (Development)');
    win.loadURL('http://localhost:3000');
  } else {
    console.log('Loading from dist/index.html (Production)');
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  }
}

app.whenReady().then(() => {
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