import { elIndex } from "./ui_1";

export const searchFunc = (el: elIndex) => {
  const search: string[] = el.search.value
    .toLocaleUpperCase()
    .trim()
    .split(" ");

  const notesChildren = el.notes.children as HTMLCollectionOf<HTMLElement>;
  const noteElementsArr = Array.from(notesChildren);
  if (!search.toLocaleString()) {
    noteElementsArr.forEach((noteEl) => {
      if (noteEl.classList.contains("display")) {
        noteEl.classList.remove("display");
      }
    });
  }

  let notesObj: any = {};
  let exact: boolean = false;
  for (let i = 0; i < noteElementsArr.length; i++) {
    let strArr: string[] | undefined = noteElementsArr[i]
      .querySelector(".note-text")
      ?.innerHTML.toLocaleUpperCase()
      .trim()
      .split(" ");
    Object.assign(notesObj, { [`${noteElementsArr[i].id}`]: strArr });
  }

  let arrPossibleMatches: string[] = [];
  for (const key in notesObj) {
    if (Object.prototype.hasOwnProperty.call(notesObj, key)) {
      const element: string[] | undefined = notesObj[key];
      if (element) {
        if (element.toLocaleString() === search.toLocaleString()) {
          noteElementsArr.forEach((noteEl) => {
            if (noteEl.id !== `${key}`) {
              noteEl.classList.add("display");
            } else {
              noteEl.classList.remove("display");
            }
          });
          arrPossibleMatches = [];
          exact = true;
          break;
        } else {
          search.forEach((searchStr) => {
            if (
              element.includes(searchStr) ||
              element.includes(`${searchStr}.`) ||
              element.includes(`${searchStr},`)
            ) {
              arrPossibleMatches.push(`${key}`);
            }
          });
          exact = false;
        }
      }
    }
  }
  if (arrPossibleMatches.length) {
    noteElementsArr.forEach((noteEl) => {
      if (!arrPossibleMatches.includes(noteEl.id)) {
        noteEl.classList.add("display");
      } else {
        noteEl.classList.remove("display");
      }
    });
  } else if (!arrPossibleMatches.length && search.toLocaleString() && !exact) {
    noteElementsArr.forEach((noteEl) => {
      noteEl.classList.add("display");
    });
  }
};
