const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const fs = require("fs");
const path = require("path");
let win;
const jsonDirPath = path.join(app.getPath("userData"), "json");
const archiveDirPath = path.join(app.getPath("userData"), "archive");
const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(app.getAppPath(), "public/index.js"),
      nodeIntegration: true,
    },
  });
  win.loadFile(path.join(app.getAppPath(), "public/index.html"));
  if (!fs.existsSync(jsonDirPath)) {
    fs.mkdirSync(jsonDirPath);
    fs.writeFileSync(
      path.join(jsonDirPath, `id.json`),
      JSON.stringify({ id: [] })
    );
  }
  if (!fs.existsSync(archiveDirPath)) {
    fs.mkdirSync(archiveDirPath);
  }
};
Menu.setApplicationMenu(null);
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.on("loaded", (_, winLocation) => {
  let files;
  let dirPath;
  if (winLocation.includes("index.html")) {
    files = fs.readdirSync(jsonDirPath);
    dirPath = jsonDirPath;
  } else if (winLocation.includes("archive.html")) {
    files = fs.readdirSync(archiveDirPath);
    dirPath = archiveDirPath;
  } else if (winLocation.includes("create.html")) {
    win.webContents.send("hello-world", []);
  }
  let arrLinks = [];
  if (files) {
    files.forEach((file) => {
      if (file === "id.json") {
        return null;
      } else {
        const data = JSON.parse(
          fs.readFileSync(path.join(dirPath, file), {
            encoding: "utf-8",
          })
        );

        arrLinks.push({
          path: path.join(dirPath, file),
          id: data.id,
          date: data.date,
        });
      }
    });
    win.webContents.send("hello-world", arrLinks);
  }
});

ipcMain.on("save-clicked", (_, noteData, id) => {
  if (!id) {
    fs.readFile(
      path.join(jsonDirPath, `id.json`),
      { encoding: "utf-8" },
      (err, data) => {
        if (err) {
          console.log(err.message);
        } else {
          let idArr = JSON.parse(data).id;
          let newId = 0;
          if (idArr.length) {
            idArr = idArr.sort((a, b) => {
              return a - b;
            });
            newId = idArr[idArr.length - 1] + 1;
          }
          fs.writeFile(
            path.join(jsonDirPath, `id.json`),
            JSON.stringify({
              id: [...idArr, newId],
            }),
            (err) => {
              if (err) {
                console.log(err.message);
              } else {
                fs.writeFile(
                  path.join(jsonDirPath, `json${newId}.json`),
                  JSON.stringify({
                    id: newId,
                    note: noteData.trim(),
                    date: new Date().getTime(),
                  }),
                  (err) => {
                    if (err) {
                      console.log(err.message);
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } else {
    fs.writeFile(
      path.join(jsonDirPath, `json${id}.json`),
      JSON.stringify({
        id: id,
        note: noteData.trim(),
        date: new Date().getTime(),
      }),
      (err) => {
        if (err) {
          console.log(err.message);
        }
      }
    );
  }
});
ipcMain.on("delete", (_, id, winLocation) => {
  let dirPath;
  if (winLocation.includes("index.html")) {
    dirPath = jsonDirPath;
  } else {
    dirPath = archiveDirPath;
  }
  fs.rm(
    path.join(dirPath, `json${id}.json`),
    { recursive: true, force: true },
    (err) => {
      if (err) {
        console.log(err.message);
      } else {
        const idPath = path.join(jsonDirPath, "id.json");
        fs.readFile(idPath, { encoding: "utf-8" }, (err, data) => {
          if (err) {
            console.log(err.message);
          } else {
            const idData = JSON.parse(data);
            const arrId = idData.id.filter((el) => {
              return el !== Number(id);
            });
            fs.writeFileSync(idPath, JSON.stringify({ id: arrId }));
            win.webContents.send("delete-success", id);
          }
        });
      }
    }
  );
});

ipcMain.on("edit", (_, id) => {
  fs.readFile(
    path.join(jsonDirPath, `json${id}.json`),
    { encoding: "utf-8" },
    (err, data) => {
      if (err) {
        console.log(err.message);
      } else {
        const jsonData = JSON.parse(data);
        win.webContents.send("edit-data", jsonData);
      }
    }
  );
});

ipcMain.on("archive", (_, id) => {
  fs.readFile(
    path.join(jsonDirPath, `json${id}.json`),
    { encoding: "utf-8" },
    (err, data) => {
      if (err) {
        console.log(err.message);
      } else {
        fs.writeFile(
          path.join(archiveDirPath, `json${id}.json`),
          data,
          (err) => {
            if (err) {
              console.log(err);
            } else {
              win.webContents.send("archived", id);
              fs.rm(path.join(jsonDirPath, `json${id}.json`), (err) => {
                err ? console.log(err.message) : null;
              });
            }
          }
        );
      }
    }
  );
});

ipcMain.on("unarchive", (_, id) => {
  fs.readFile(
    path.join(archiveDirPath, `json${id}.json`),
    { encoding: "utf-8" },
    (err, data) => {
      if (err) {
        console.log(err.message);
      } else {
        fs.writeFileSync(path.join(jsonDirPath, `json${id}.json`), data);
        fs.rm(path.join(archiveDirPath, `json${id}.json`), (err) => {
          err
            ? console.log(err.message)
            : win.webContents.send("unarchived", id);
        });
      }
    }
  );
});
