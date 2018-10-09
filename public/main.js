const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const isDev = require("electron-is-dev");
const path = require("path");
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 320,
    height: 237,
    frame: false,
    titleBarStyle: "hiddenInset"
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.loadURL("http://localhost:3000");
  app.setAboutPanelOptions({
    applicationName: "timeprime",
    applicationVersion: "0.0.1"
  });
  mainWindow.on("closed", () => (mainWindow = null));
}
app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
