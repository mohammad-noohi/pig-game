"use strict";

/*=============================== Elements ===============================*/

const diceEl = $(".dice");
const newBtn = $(".btn--new");
const rollBtn = $(".btn--roll");
const holdBtn = $(".btn--hold");
const player0 = $(".player--0");
const player1 = $(".player--1");
const score0El = $(".score--0");
const score1El = $(".score--1");
const current0El = $(".current--0");
const current1El = $(".current--1");

let currentScore = 0;
let acitvePlayer = 0;
let scores = [0, 0];
let playing = true;

/*================================= Functions =================================*/

// select one element
function $(selector) {
  return document.querySelector(selector);
}

// select all elements
function $$(selector) {
  return document.querySelector(selector);
}

/*==================================== Events ====================================*/

// Start condition
diceEl.classList.add("hidden");
score0El.textContent = 0;
score1El.textContent = 0;
current0El.textContent = 0;
current1El.textContent = 0;

rollBtn.addEventListener("click", () => {
  if (playing) {
    const randomDice = Math.trunc(Math.random() * 6) + 1; // 1 - 6
    diceEl.src = `./src/images/dice-${randomDice}.png`;
    diceEl.classList.remove("hidden");

    // 1. if dice be 1 or not ?
    if (randomDice !== 1) {
      currentScore += randomDice;
      $(`.current--${acitvePlayer}`).textContent = currentScore;
    } else {
      // switch player
      acitvePlayer = acitvePlayer ? 0 : 1;
      player0.classList.remove("player--active");
      player1.classList.remove("player--active");
      $(`.player--${acitvePlayer}`).classList.add("player--active");
      currentScore = 0;
      current0El.textContent = 0;
      current1El.textContent = 0;
    }
  }
});

holdBtn.addEventListener("click", () => {
  if (playing) {
    if (currentScore > 0) {
      // اگر اشتباهی دستش روی دکمه خورد عوض نشه و حداقل یه بار تاس انداخته باشه
      scores[acitvePlayer] += currentScore;
      document.querySelector(`.score--${acitvePlayer}`).textContent = scores[acitvePlayer];
      if (scores[acitvePlayer] >= 20) {
        // اگر برنده داشتیم که بازی باید تمام بشه
        document.querySelector(`.player--${acitvePlayer}`).classList.add("player--winner");
        // console.log(document.querySelector(`.player--${acitvePlayer}`));
        console.log(`player ${acitvePlayer} won the game`);
        playing = false;
      } else {
        // اگر برنده ای نداشت عوضش کن
        // switch player
        acitvePlayer = acitvePlayer ? 0 : 1;
        player0.classList.remove("player--active");
        player1.classList.remove("player--active");
        $(`.player--${acitvePlayer}`).classList.add("player--active");
        currentScore = 0;
        current0El.textContent = 0;
        current1El.textContent = 0;
      }
    }
  }
});

newBtn.addEventListener("click", () => {
  console.log("new game");
  currentScore = 0;
  acitvePlayer = 0;
  scores = [0, 0];
  playing = true;
  diceEl.classList.add("hidden");
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
});
