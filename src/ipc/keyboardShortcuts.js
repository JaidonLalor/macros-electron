// src/ipc/keyboardShortcuts.js
import { app, globalShortcut } from 'electron';

export const registerKeyboardShortcuts = () => {
  globalShortcut.register('CommandOrControl+Q', () => {
    app.quit();
  });

  // Add more keyboard shortcuts here as needed
};

export const unregisterKeyboardShortcuts = () => {
  globalShortcut.unregisterAll();
};