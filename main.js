const { app, BrowserWindow } = require("electron");
const path = require("path");
const theme = require("./toggle-theme");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("pages/login.html");
  theme;
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
// Electron reloader
try {
  require("electron-reloader")(module);
} catch (_) {}
