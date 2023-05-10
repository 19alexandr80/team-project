import "./sass/index.scss";
import { DataFirebase } from "./js/firebase-app.js";

const dataFirebase = new DataFirebase();
const request = {
  texr: "ok",
  dete: new Date().toJSON(),
};
// dataFirebase.postRequest(request, "test@test");

// async function getData(test) {
//   const data = await dataFirebase.getRequest(test);
//   console.log(data);
// }
// getData("test@test");

// ========================================================================
const buttonStart = document.querySelector(".button-start");
const playingFieldDocument = document.querySelector(".playng-field");
const playingField = [];
let bombLength = 5;

buttonStart.addEventListener("click", onButtonStart);

function onButtonStart() {
  playingField.length = 0;
  for (let i = 0; i < 10; i++) {
    let tr = [];
    for (let i = 0; i < 10; i++) {
      tr[i] = 0;
    }
    playingField.push(tr);
  }

  createPlayngField(addBombPlayngField(playingField));
}
function addBombPlayngField(playingField) {
  for (let i = 0; i < bombLength; ) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    if (playingField[x][y] !== 1) {
      playingField[x][y] = "bomb";
      // playingFieldDanger(x, y);
      i++;
    }
  }
  playingFieldDanger();
  // console.log(playingField);
  return playingField;
}
const height = 10;
const width = 10;
function playingFieldDanger() {
  // if (x > 0 && x < 9) {
  //   if (y > 0 && y < 9) {
  //     playingField[x - 1][y - 1] += 1;
  //     playingField[x - 1][y] += 1;
  //     playingField[x - 1][y + 1] += 1;
  //     playingField[x][y - 1] += 1;
  //     playingField[x][y + 1] += 1;
  //     playingField[x + 1][y + 1] += 1;
  //     playingField[x + 1][y] += 1;
  //     playingField[x + 1][y - 1] += 1;
  //   }
  // }
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let z = 0;
      let xS = j > 0 ? j - 1 : j;
      let yS = i > 0 ? i - 1 : i;
      let xE = j < width - 1 ? j + 1 : j;
      let yE = i < height - 1 ? i + 1 : i;
      if (playingField[i][j] != "bomb") {
        for (let f = yS; f <= yE; f++) {
          for (let s = xS; s <= xE; s++) {
            if (playingField[f][s] == "bomb") z++;
          }
        }
        playingField[i][j] = z;
      }
    }
  }
  console.log(playingField);
}

function createPlayngField(playingField) {
  const playingFieldHtml = playingField
    .map((tr) => {
      return `<tr>${tr
        .map((td) => {
          return `<td></td>`;
        })
        .join("")}</tr>`;
    })
    .join("");
  playingFieldDocument.innerHTML = playingFieldHtml;
}
playingFieldDocument.addEventListener("click", onClickField);
function onClickField(e) {
  // e.target.classList.add("open");
  const yEvent = e.target.parentNode.rowIndex - 1;
  const xEvent = e.target.cellIndex;
  console.log(yEvent, xEvent);
  console.log(playingField[yEvent][xEvent]);
  if (playingField[yEvent][xEvent] === "bomb") {
    alert("boom");
    e.target.innerHTML = "&#128163;";
    return;
    // playingFieldDocument.removeEventListener("click", onClickField);
  }
  if (playingField[yEvent][xEvent] !== 0) {
    e.target.classList.add("open");
    e.target.innerHTML = playingField[yEvent][xEvent];
    return;
  }
  if (playingField[yEvent][xEvent] !== "bomb") {
    rekyrs(yEvent, xEvent);
  }
}

playingFieldDocument.addEventListener("contextmenu", onLokc);

function onLokc(e) {
  e.preventDefault();
  const lock = e.target;
  if (lock.tagName == "IMG" || lock.parentNode.className == "open") {
    lock.parentNode.classList.remove("lokc");
    lock.parentNode.innerHTML = "";
  }
  if (lock.tagName != "TD" || lock.className == "open") return;
  if (lock.innerHTML == "") {
    lock.innerHTML = "&#128679;";
    lock.classList.add("lokc");
  } else {
    lock.innerHTML = "";
    lock.classList.remove("lokc");
  }
}
let n = 0;
function rekyrs(i, j) {
  let fdf = "";
  for (let f = i > 0 ? i - 1 : i; f <= (i < height - 1 ? i + 1 : i); f++) {
    for (let s = j > 0 ? j - 1 : j; s <= (j < width - 1 ? j + 1 : j); s++) {
      fdf = playingFieldDocument.rows[f].cells[s].className;
      if (fdf != "open" && fdf != "lokc") {
        playingFieldDocument.rows[f].cells[s].classList.add("open");
        if (playingField[f][s] != 0)
          playingFieldDocument.rows[f].cells[s].innerHTML = playingField[f][s];
        // score--;
        // points.innerHTML = score;
        if (playingField[f][s] == 0) rekyrs(f, s);
      }
    }
  }
}
// =========================================================================
const but = document.querySelector(".button-autt");
but.addEventListener("click", () => {
  console.log("google");
  dataFirebase.getGoogl();
});
