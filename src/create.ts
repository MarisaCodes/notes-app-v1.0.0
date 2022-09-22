import { ipcRenderer } from "electron";
import { elIndex } from "./ui_1";
export type elCreate = {
  saveBtn: HTMLLIElement;
  note: HTMLTextAreaElement;
  warning: HTMLSpanElement;
};

export const warningUi = (el: elCreate | elIndex): void => {
  if (el.warning.classList.contains("display")) {
    el.warning.classList.remove("display");
    setTimeout(() => {
      el.warning.classList.add("display");
    }, 2000);
  }
};

export const saveClick = (elCreate: elCreate) => {
  if (elCreate.note.value.length <= 5000) {
    ipcRenderer.send(
      "save-clicked",
      elCreate.note.value,
      localStorage.getItem("id")
    );
    window.location.replace("index.html");
  } else {
    warningUi(elCreate);
  }
};
