(() => {
  "use strict";
  var e = {
      536: (e, t, n) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.saveClick = t.warningUi = void 0);
        const i = n(298);
        (t.warningUi = (e) => {
          e.warning.classList.contains("display") &&
            (e.warning.classList.remove("display"),
            setTimeout(() => {
              e.warning.classList.add("display");
            }, 2e3));
        }),
          (t.saveClick = (e) => {
            e.note.value.length <= 5e3
              ? (i.ipcRenderer.send(
                  "save-clicked",
                  e.note.value,
                  localStorage.getItem("id")
                ),
                window.location.replace("index.html"))
              : (0, t.warningUi)(e);
          });
      },
      659: function (e, t) {
        var n =
          (this && this.__awaiter) ||
          function (e, t, n, i) {
            return new (n || (n = Promise))(function (o, l) {
              function r(e) {
                try {
                  d(i.next(e));
                } catch (e) {
                  l(e);
                }
              }
              function a(e) {
                try {
                  d(i.throw(e));
                } catch (e) {
                  l(e);
                }
              }
              function d(e) {
                var t;
                e.done
                  ? o(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(r, a);
              }
              d((i = i.apply(e, t || [])).next());
            });
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.createNotesAsync = void 0),
          (t.createNotesAsync = function (e, t, i = "") {
            return n(this, void 0, void 0, function* () {
              if (
                window.location.href.includes("index.html") ||
                window.location.href.includes("archive.html")
              ) {
                const n = e.sort((e, t) => t.date - e.date);
                for (let e = 0; e < n.length; e++)
                  yield fetch(n[e].path)
                    .then((e) => e.json())
                    .then((e) => {
                      var n, o, l, r;
                      i = String(e.id);
                      const a = document.createElement("div"),
                        d = new Date(Number(e.date)),
                        c = `${d.toDateString()} ${d
                          .getHours()
                          .toLocaleString()
                          .padStart(2, "0")}:${String(d.getMinutes()).padStart(
                          2,
                          "0"
                        )}`;
                      (a.innerHTML =
                        `\n  <ul class="options display">\n    <li id="edit">edit</li>\n    <li id="delete">delete</li>\n    <li id="archive"></li>\n    <li id="date">${c}</li>\n  </ul><span class="note-text">${e.note}</span>`.trim()),
                        window.location.href.includes("archive.html")
                          ? (null === (n = a.querySelector("#archive")) ||
                              void 0 === n ||
                              n.setAttribute("id", "unarchive"),
                            null === (o = a.querySelector("#unarchive")) ||
                              void 0 === o ||
                              o.insertAdjacentText("afterbegin", "unarchive"),
                            null === (l = a.querySelector("#edit")) ||
                              void 0 === l ||
                              l.remove())
                          : null === (r = a.querySelector("#archive")) ||
                            void 0 === r ||
                            r.insertAdjacentText("afterbegin", "archive"),
                        (a.className = "notes-child"),
                        (a.id = `note_${i}`),
                        t.notes.appendChild(a),
                        localStorage.removeItem("id");
                    });
              }
            });
          });
      },
      463: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.searchFunc = void 0),
          (t.searchFunc = (e) => {
            var t;
            const n = e.search.value.toLocaleUpperCase().trim().split(" "),
              i = e.notes.children,
              o = Array.from(i);
            n.toLocaleString() ||
              o.forEach((e) => {
                e.classList.contains("display") &&
                  e.classList.remove("display");
              });
            let l = {},
              r = !1;
            for (let e = 0; e < o.length; e++) {
              let n =
                null === (t = o[e].querySelector(".note-text")) || void 0 === t
                  ? void 0
                  : t.innerHTML.toLocaleUpperCase().trim().split(" ");
              Object.assign(l, { [`${o[e].id}`]: n });
            }
            let a = [];
            for (const e in l)
              if (Object.prototype.hasOwnProperty.call(l, e)) {
                const t = l[e];
                if (t) {
                  if (t.toLocaleString() === n.toLocaleString()) {
                    o.forEach((t) => {
                      t.id !== `${e}`
                        ? t.classList.add("display")
                        : t.classList.remove("display");
                    }),
                      (a = []),
                      (r = !0);
                    break;
                  }
                  n.forEach((n) => {
                    (t.includes(n) ||
                      t.includes(`${n}.`) ||
                      t.includes(`${n},`)) &&
                      a.push(`${e}`);
                  }),
                    (r = !1);
                }
              }
            a.length
              ? o.forEach((e) => {
                  a.includes(e.id)
                    ? e.classList.remove("display")
                    : e.classList.add("display");
                })
              : a.length ||
                !n.toLocaleString() ||
                r ||
                o.forEach((e) => {
                  e.classList.add("display");
                });
          });
      },
      442: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.notesUi = t.indexMenuUi = void 0),
          (t.indexMenuUi = (e, t) => {
            e.burgerIcon.contains(t) &&
            e.indexMenu.classList.contains("display")
              ? e.indexMenu.classList.remove("display")
              : e.indexMenu.contains(t) || e.indexMenu.classList.add("display");
          }),
          (t.notesUi = (e, t) => {
            var n, i;
            if (
              t.classList.contains("notes-child") ||
              t.classList.contains("note-text")
            ) {
              let o = t;
              t.classList.contains("note-text") &&
                (t ? (o = t.parentElement) : console.log("err el")),
                Array.from(e.notes.children).forEach((e) => {
                  var t;
                  e.classList.contains("focus") &&
                    e.id !== o.id &&
                    (e.classList.remove("focus"),
                    null === (t = e.querySelector(".options")) ||
                      void 0 === t ||
                      t.classList.add("display"));
                }),
                o.classList.contains("focus")
                  ? (null === (i = o.querySelector(".options")) ||
                      void 0 === i ||
                      i.classList.add("display"),
                    o.classList.remove("focus"))
                  : (null === (n = o.querySelector(".options")) ||
                      void 0 === n ||
                      n.classList.remove("display"),
                    o.classList.add("focus"));
            }
          });
      },
      172: (e, t, n) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.unarchiveNote =
            t.archiveNote =
            t.editNote =
            t.deleteNote =
              void 0);
        const i = n(298);
        (t.deleteNote = (e) => {
          var t, n, o, l;
          if (
            "delete" === e.id &&
            (null ===
              (n =
                null === (t = e.parentElement) || void 0 === t
                  ? void 0
                  : t.parentElement) || void 0 === n
              ? void 0
              : n.id)
          ) {
            const t =
              null ===
                (l =
                  null === (o = e.parentElement) || void 0 === o
                    ? void 0
                    : o.parentElement) || void 0 === l
                ? void 0
                : l.id;
            i.ipcRenderer.send("delete", t.split("_")[1], window.location.href);
          }
        }),
          (t.editNote = (e) => {
            var t, n, i, o;
            if (
              "edit" === e.id &&
              (null ===
                (n =
                  null === (t = e.parentElement) || void 0 === t
                    ? void 0
                    : t.parentElement) || void 0 === n
                ? void 0
                : n.id)
            ) {
              const t =
                null ===
                  (o =
                    null === (i = e.parentElement) || void 0 === i
                      ? void 0
                      : i.parentElement) || void 0 === o
                  ? void 0
                  : o.id;
              localStorage.setItem("id", t.split("_")[1]),
                window.location.replace("create.html");
            }
          }),
          (t.archiveNote = (e) => {
            var t, n, o, l;
            if (
              "archive" === e.id &&
              (null ===
                (n =
                  null === (t = e.parentElement) || void 0 === t
                    ? void 0
                    : t.parentElement) || void 0 === n
                ? void 0
                : n.id)
            ) {
              const t =
                null ===
                  (l =
                    null === (o = e.parentElement) || void 0 === o
                      ? void 0
                      : o.parentElement) || void 0 === l
                  ? void 0
                  : l.id;
              i.ipcRenderer.send("archive", t.split("_")[1]);
            }
          }),
          (t.unarchiveNote = (e) => {
            var t, n, o, l;
            if (
              "unarchive" === e.id &&
              (null ===
                (n =
                  null === (t = e.parentElement) || void 0 === t
                    ? void 0
                    : t.parentElement) || void 0 === n
                ? void 0
                : n.id)
            ) {
              const t =
                null ===
                  (l =
                    null === (o = e.parentElement) || void 0 === o
                      ? void 0
                      : o.parentElement) || void 0 === l
                  ? void 0
                  : l.id;
              i.ipcRenderer.send("unarchive", t.split("_")[1]);
            }
          });
      },
      298: (e) => {
        e.exports = require("electron");
      },
    },
    t = {};
  function n(i) {
    var o = t[i];
    if (void 0 !== o) return o.exports;
    var l = (t[i] = { exports: {} });
    return e[i].call(l.exports, l, l.exports, n), l.exports;
  }
  (() => {
    const e = n(442),
      t = n(172),
      i = n(463),
      o = n(536),
      l = n(659),
      r = n(298);
    window.addEventListener("DOMContentLoaded", () => {
      let n, a;
      if (
        window.location.href.includes("index.html") ||
        window.location.href.includes("archive.html")
      ) {
        (n = {
          burgerIcon: document.querySelector(".burger-icon"),
          indexMenu: document.querySelector(".menu"),
          notes: document.querySelector(".notes"),
          warning: document.querySelector(".dialog-box"),
          search: document.querySelector("#search-notes"),
        }),
          document.addEventListener("click", (i) => {
            i.target instanceof Element &&
              ((0, e.indexMenuUi)(n, i.target),
              (0, e.notesUi)(n, i.target),
              (0, t.deleteNote)(i.target),
              (0, t.editNote)(i.target),
              (0, t.archiveNote)(i.target),
              (0, t.unarchiveNote)(i.target));
          }),
          r.ipcRenderer.on("delete-success", (e, t) => {
            var i;
            null === (i = document.getElementById(`note_${t}`)) ||
              void 0 === i ||
              i.remove(),
              (n.warning.innerHTML = "note deleted successfully"),
              (0, o.warningUi)(n);
          }),
          r.ipcRenderer.on("archived", (e, t) => {
            var i;
            null === (i = document.getElementById(`note_${t}`)) ||
              void 0 === i ||
              i.remove(),
              (n.warning.innerHTML = "note archived successfully"),
              (0, o.warningUi)(n);
          }),
          r.ipcRenderer.on("unarchived", (e, t) => {
            var i;
            null === (i = document.getElementById(`note_${t}`)) ||
              void 0 === i ||
              i.remove(),
              (n.warning.innerHTML = "note unarchived successfully"),
              (0, o.warningUi)(n);
          });
        const l = (e) => {
          (n.search.innerText = e.key), (0, i.searchFunc)(n);
        };
        window.addEventListener("keyup", l, !0);
      } else
        window.location.href.includes("create.html") &&
          ((a = {
            saveBtn: document.querySelector(".save"),
            note: document.querySelector("#note"),
            warning: document.querySelector(".dialog-box"),
          }),
          a.saveBtn.addEventListener("click", () => {
            (0, o.saveClick)(a);
          }));
      r.ipcRenderer.send("loaded", window.location.href),
        r.ipcRenderer.on("hello-world", (e, t) => {
          var i, o, d;
          (window.location.href.includes("index.html") ||
            window.location.href.includes("archive.html")) &&
            (t.length
              ? null === (o = document.querySelector(".empty-page-text")) ||
                void 0 === o ||
                o.classList.add("display")
              : null === (i = document.querySelector(".empty-page-text")) ||
                void 0 === i ||
                i.classList.remove("display")),
            console.log("hello world"),
            t instanceof Array && (0, l.createNotesAsync)(t, n),
            window.location.href.includes("create.html") &&
              (null === (d = document.querySelector("textarea")) ||
                void 0 === d ||
                d.focus()),
            localStorage.getItem("id") &&
              window.location.href.includes("create.html") &&
              (r.ipcRenderer.send("edit", localStorage.getItem("id")),
              r.ipcRenderer.on("edit-data", (e, t) => {
                a.note.value = t.note;
              }));
        });
    });
  })();
})();
