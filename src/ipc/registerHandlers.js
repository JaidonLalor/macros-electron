// src/ipc/registerHandlers.js
import { ipcMain, app } from 'electron';
import { databaseHandlers } from './databaseHandlers.js';
import { registerKeyboardShortcuts } from './keyboardShortcuts.js';

export const registerHandlers = () => {
  // Database
  Object.entries(databaseHandlers).forEach(([channel, handler]) => {
    ipcMain.handle(channel, handler);
  });

  // Keyboard shortcuts
  registerKeyboardShortcuts();

  // Other handlers
  ipcMain.on('quit-app', () => {
    app.quit();
  });
};