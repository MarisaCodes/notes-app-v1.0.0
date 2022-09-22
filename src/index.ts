import { indexMenuUi, elIndex, notesUi } from "./ui_1";
import { deleteNote, editNote, archiveNote, unarchiveNote } from "./ui_2";
import { searchFunc } from "./search";
import { elCreate, saveClick, warningUi } from "./create";
import { createNotesAsync } from "./notes-on-load";
import { ipcRenderer } from "electron";
window.addEventListener("DOMContentLoaded", () => {
  // vars init
  let elIndex: elIndex;
  let elCreate: elCreate;
  // end

  if (
    window.location.href.includes("index.html") ||
    window.location.href.includes("archive.html")
  ) {
    elIndex = {
      burgerIcon: document.querySelector(".burger-icon") as HTMLDivElement,
      indexMenu: document.querySelector(".menu") as HTMLUListElement,
      notes: document.querySelector(".notes") as HTMLDivElement,
      warning: document.querySelector(".dialog-box") as HTMLSpanElement,
      search: document.querySelector("#search-notes") as HTMLInputElement,
    };
    document.addEventListener("click", (event) => {
      if (event.target instanceof Element) {
        indexMenuUi(elIndex, event.target);
        notesUi(elIndex, event.target);
        deleteNote(event.target);
        editNote(event.target);
        archiveNote(event.target);
        unarchiveNote(event.target);
      }
    });
    ipcRenderer.on("delete-success", (_, id) => {
      document.getElementById(`note_${id}`)?.remove();
      elIndex.warning.innerHTML = "note deleted successfully";
      warningUi(elIndex);
    });
    ipcRenderer.on("archived", (_, id) => {
      document.getElementById(`note_${id}`)?.remove();
      elIndex.warning.innerHTML = "note archived successfully";
      warningUi(elIndex);
    });
    ipcRenderer.on("unarchived", (_, id) => {
      document.getElementById(`note_${id}`)?.remove();
      elIndex.warning.innerHTML = "note unarchived successfully";
      warningUi(elIndex);
    });

    const handleKeyPress = (event: any): void => {
      elIndex.search.innerText = event.key;
      searchFunc(elIndex);
    };
    window.addEventListener("keyup", handleKeyPress, true);
    //
  } else if (window.location.href.includes("create.html")) {
    elCreate = {
      saveBtn: document.querySelector(".save") as HTMLLIElement,
      note: document.querySelector("#note") as HTMLTextAreaElement,
      warning: document.querySelector(".dialog-box") as HTMLSpanElement,
    };
    elCreate.saveBtn.addEventListener("click", () => {
      saveClick(elCreate);
    });
  }
  // test
  ipcRenderer.send("loaded", window.location.href);
  ipcRenderer.on("hello-world", (_, jsonFiles) => {
    if (
      window.location.href.includes("index.html") ||
      window.location.href.includes("archive.html")
    ) {
      if (!jsonFiles.length) {
        document.querySelector(".empty-page-text")?.classList.remove("display");
      } else {
        document.querySelector(".empty-page-text")?.classList.add("display");
      }
    }
    console.log("hello world");
    jsonFiles instanceof Array ? createNotesAsync(jsonFiles, elIndex) : null;
    if (window.location.href.includes("create.html")) {
      document.querySelector("textarea")?.focus();
    }
    if (localStorage.getItem("id")) {
      if (window.location.href.includes("create.html")) {
        ipcRenderer.send("edit", localStorage.getItem("id"));
        ipcRenderer.on("edit-data", (_, jsonData) => {
          elCreate.note.value = jsonData.note;
        });
      }
    }
  });
});
