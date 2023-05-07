let test = 0;
let width = 10;
let height = 10;
let bomb = test;
let table = document.createElement("tbody");
let points = document.querySelector(".points");
let timeGame = document.querySelector(".timeGame");
let context = [];
let score = width * height - bomb;
let seconds = 0;
let timerId;
let blokScreen = 0;
let div = document.querySelector("table");

let min = 0;

function start() {
  stopClock();
  blokScreen = 0;
  test = prompt("boom", "10");
  bomb = test;
  timeGame.innerHTML = 0;
  timerId = setInterval(cloc, 1000);
  context = [];
  score = width * height - bomb;
  points.innerHTML = score;
  table.innerHTML = "";
  for (let i = 0; i < height; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < width; j++) {
      let td = document.createElement("td");
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  div.appendChild(table);
  for (let i = 0; i < height; i++) {
    let nte = [];
    for (let j = 0; j < width; j++) {
      nte.push("");
    }
    context.push(nte);
  }
  for (let i = 0; i < bomb; ) {
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);
    if (context[y][x] != "B") {
      context[y][x] = "B";
      i++;
    }
  }
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let z = 0;
      let xS = j > 0 ? j - 1 : j;
      let yS = i > 0 ? i - 1 : i;
      let xE = j < width - 1 ? j + 1 : j;
      let yE = i < height - 1 ? i + 1 : i;
      if (context[i][j] != "B") {
        for (let f = yS; f <= yE; f++) {
          for (let s = xS; s <= xE; s++) {
            if (context[f][s] == "B") z++;
          }
        }
        context[i][j] = z;
      }
    }
  }
}
start();
let button = document.querySelectorAll("button");
button[0].addEventListener("click", start);
table.addEventListener("click", clic);
table.addEventListener("contextmenu", lokc);
function clic(e) {
  let clikc = e.target;
  if (
    clikc.tagName != "TD" ||
    clikc.className == "lokc" ||
    clikc.className == "open" ||
    blokScreen != 0
  )
    return;
  clikc.classList.add("open");
  score--;
  let yd = clikc.parentNode.rowIndex - 1;
  let xd = clikc.cellIndex;
  if (context[yd][xd] != 0 && context[yd][xd] != "B")
    clikc.innerHTML = context[yd][xd];
  points.innerHTML = score;
  if (context[yd][xd] == 0) rekyrs(yd, xd);
  if (context[yd][xd] == "B") {
    alert("game over");
    stopClock();
    over();
  } else {
    if (score == 0) {
      alert("ПОБЕДА");
      stopClock();
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (context[i][j] == "B") {
            if (table.rows[i].cells[j].className == "lokc")
              table.rows[i].cells[j].classList.remove("lokc");
            table.rows[i].cells[j].innerHTML = "&#128163;";
            table.rows[i].cells[j].style.color = "#00FFA9";
          }
        }
      }
    }
  }
}
function cloc() {
  seconds++;
  //timeGame.innerHTML = seconds + ' s.';
  //креатив минуты

  if (seconds > 59) {
    seconds = 0;
    min++;
    //timeGame.innerHTML = min + ' m ' + seconds + ' s.';
  }
  if (min > 0) {
    timeGame.innerHTML = min + " m " + seconds + " s.";
  } else {
    timeGame.innerHTML = seconds + " s.";
  }
}
function stopClock() {
  blokScreen = 1;
  clearInterval(timerId);
  timerId = null;
  seconds = 0;
  min = 0;
}
function rekyrs(i, j) {
  let fdf = "";
  for (let f = i > 0 ? i - 1 : i; f <= (i < height - 1 ? i + 1 : i); f++) {
    for (let s = j > 0 ? j - 1 : j; s <= (j < width - 1 ? j + 1 : j); s++) {
      fdf = table.rows[f].cells[s].className;
      if (fdf != "open" && fdf != "lokc") {
        table.rows[f].cells[s].classList.add("open");
        if (context[f][s] != 0)
          table.rows[f].cells[s].innerHTML = context[f][s];
        score--;
        points.innerHTML = score;
        if (context[f][s] == 0) rekyrs(f, s);
      }
    }
  }
}
function over() {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (context[i][j] == "B") {
        if (table.rows[i].cells[j].className == "lokc")
          table.rows[i].cells[j].classList.remove("lokc");
        table.rows[i].cells[j].innerHTML = "&#128128;";
        table.rows[i].cells[j].style.backgroundColor = "#FF0003";
        table.rows[i].cells[j].style.color = "#CA0003";
      }
    }
  }
}
function lokc(e) {
  e.preventDefault();
  let lock = e.target;
  console.log(lock.tagName);
  if (lock.tagName == "IMG" || lock.parentNode.className == "open") {
    lock.parentNode.classList.remove("lokc");
    lock.parentNode.innerHTML = "";
  }
  if (lock.tagName != "TD" || lock.className == "open" || blokScreen != 0)
    return;
  if (lock.innerHTML == "") {
    lock.innerHTML = "&#128679;";
    lock.classList.add("lokc");
  } else {
    lock.innerHTML = "";
    lock.classList.remove("lokc");
  }
}
