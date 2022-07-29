const { contextBridge, ipcRenderer } = require("electron");
// Toutes les APIs Node.js sont disponibles dans le processus de préchargement.
// Il a la même sandbox qu'une extension Chrome.
const settings = require("./settings.json");

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

contextBridge.exposeInMainWorld("darkMode", {
  toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
  system: () => ipcRenderer.invoke("dark-mode:system"),
});

contextBridge.exposeInMainWorld("electronApi", {
  apiUrl: settings.apiUrl,
  image: settings.urlImage,
  default: settings.defaultImg,
});
