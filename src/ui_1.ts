export type elIndex = {
  burgerIcon: HTMLDivElement;
  indexMenu: HTMLUListElement;
  notes: HTMLDivElement;
  warning: HTMLSpanElement;
  search: HTMLInputElement;
};

export const indexMenuUi = (elIndex: elIndex, element: Element): void => {
  if (
    elIndex.burgerIcon.contains(element) &&
    elIndex.indexMenu.classList.contains("display")
  ) {
    elIndex.indexMenu.classList.remove("display");
  } else if (!elIndex.indexMenu.contains(element)) {
    elIndex.indexMenu.classList.add("display");
  }
};

export const notesUi = (elIndex: elIndex, element: Element): void => {
  if (
    element.classList.contains("notes-child") ||
    element.classList.contains("note-text")
  ) {
    let el: any = element;
    if (element.classList.contains("note-text")) {
      element ? (el = element.parentElement) : console.log("err el");
    }
    Array.from(elIndex.notes.children).forEach((note) => {
      if (note.classList.contains("focus") && note.id !== el.id) {
        note.classList.remove("focus");
        note.querySelector(".options")?.classList.add("display");
      }
    });
    if (!el.classList.contains("focus")) {
      el.querySelector(".options")?.classList.remove("display");
      el.classList.add("focus");
    } else {
      el.querySelector(".options")?.classList.add("display");
      el.classList.remove("focus");
    }
  }
};
