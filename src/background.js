const { app, BrowserWindow, Menu, globalShortcut } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "../public/appIcon.ico",
  });
  // win.loadFile("../dist/index.html");
  win.loadURL("https://bondhub.sxzq.com");

  win.webContents.on("context-menu", (event, params) => {
    const menu = Menu.buildFromTemplate([
      {
        label: "复制😀",
        enabled: params.editFlags.canCopy,
        role: "copy",
      },
      {
        label: "粘贴😀",
        enabled: params.editFlags.canPaste,
        role: "paste",
      },
      {
        type: "separator",
      },
      {
        label: "开发者工具🍼",
        click: () => {
          win.webContents.openDevTools({ mode: "detach" });
        },
      },
    ]);
    menu.popup();
  });
};

const createMenu = () => {
  const template = [
    { label: "菜单一", submenu: [{ label: "功能一" }, { label: "功能二" }] },
    { label: "菜单二", submenu: [{ label: "功能一" }, { label: "功能二" }] },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

app.whenReady().then(() => {
  createWindow();
  createMenu();

  // // 注册全局快捷键 F12 打开开发者工具
  // globalShortcut.register("F12", () => {
  //   const focusedWindow = BrowserWindow.getFocusedWindow();
  //   if (focusedWindow) {
  //     focusedWindow.webContents.openDevTools();
  //   }
  // });
  // // 检查快捷键是否注册成功
  // console.log(globalShortcut.isRegistered("F12"));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("will-quit", () => {
  // 清理全局快捷键的注册
  globalShortcut.unregisterAll();
});
