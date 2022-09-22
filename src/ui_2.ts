import { ipcRenderer } from "electron";

export const deleteNote = (element: Element): void => {
  if (element.id === "delete") {
    if (element.parentElement?.parentElement?.id) {
      const id = element.parentElement?.parentElement?.id;
      ipcRenderer.send("delete", id.split("_")[1], window.location.href);
    }
  }
};

export const editNote = (element: Element): void => {
  if (element.id === "edit") {
    if (element.parentElement?.parentElement?.id) {
      const id = element.parentElement?.parentElement?.id;
      localStorage.setItem("id", id.split("_")[1]);
      window.location.replace("create.html");
    }
  }
};

export const archiveNote = (element: Element): void => {
  if (element.id === "archive") {
    if (element.parentElement?.parentElement?.id) {
      const id = element.parentElement?.parentElement?.id;
      ipcRenderer.send("archive", id.split("_")[1]);
    }
  }
};

export const unarchiveNote = (element: Element): void => {
  if (element.id === "unarchive") {
    if (element.parentElement?.parentElement?.id) {
      const id = element.parentElement?.parentElement?.id;
      ipcRenderer.send("unarchive", id.split("_")[1]);
    }
  }
};
