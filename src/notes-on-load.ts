import { elIndex } from "./ui_1";

export async function createNotesAsync(
  jsonFiles: any[],
  elIndex: elIndex,
  id: string = ""
) {
  if (
    window.location.href.includes("index.html") ||
    window.location.href.includes("archive.html")
  ) {
    const sortedJsonFiles = jsonFiles.sort((a, b) => {
      return b.date - a.date;
    });
    for (let i = 0; i < sortedJsonFiles.length; i++) {
      await fetch(sortedJsonFiles[i].path)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          id = String(data.id);
          const notesChild: HTMLDivElement = document.createElement("div");
          const dateVal = new Date(Number(data.date));
          const date = `${dateVal.toDateString()} ${dateVal
            .getHours()
            .toLocaleString()
            .padStart(2, "0")}:${String(dateVal.getMinutes()).padStart(
            2,
            "0"
          )}`;
          notesChild.innerHTML = `
  <ul class="options display">
    <li id="edit">edit</li>
    <li id="delete">delete</li>
    <li id="archive"></li>
    <li id="date">${date}</li>
  </ul><span class="note-text">${data.note}</span>`.trim();
          if (window.location.href.includes("archive.html")) {
            notesChild
              .querySelector("#archive")
              ?.setAttribute("id", "unarchive");

            notesChild
              .querySelector("#unarchive")
              ?.insertAdjacentText("afterbegin", "unarchive");
            notesChild.querySelector("#edit")?.remove();
          } else {
            notesChild
              .querySelector("#archive")
              ?.insertAdjacentText("afterbegin", "archive");
          }
          notesChild.className = "notes-child";
          notesChild.id = `note_${id}`;
          elIndex.notes.appendChild(notesChild);
          localStorage.removeItem("id");
        });
    }
  }
}
