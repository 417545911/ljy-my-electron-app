const { app, BrowserWindow, Menu } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadFile("index.html");
};

const createMenu = () => {
  const template = [
    { label: "菜单一", submenu: [{ label: "功能一" }, { label: "功能二" }] },
    { label: "菜单二", submenu: [{ label: "功能一" }, { label: "功能二" }] },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu)
};

app.whenReady().then(() => {
  createWindow();
  createMenu();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      createMenu();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit;
  }
});
