import { $ } from "./$";
import { render } from "./Components/Board";
export let state = {
  app: $("app"),
  score: 0,
  scoreUpdated: false,
  highScore: 0,
  timer: 0,
  timeOutTimer: 0,
  timeLeft: 120,
  effortLevel: { easy: [3, 3], medium: [4, 4], hard: [5, 5] },
  active: -1,
  cells: [],

  clearActive: () => {
    if (
      state.active > -1 &&
      state.cells[state.active] &&
      state.cells[state.active].style
    ) {
      state.cells[state.active].style.background = "#ccc";
    }
  },
  updateHighScore: (init) => {
    if (init) {
      if (localStorage.getItem("highscore")) {
        state.highScore = localStorage.getItem("highscore");
      }
    } else {
      if (state.highScore === null) {
        console.log(state.highScore);
        state.highScore = state.score;
      }
      if (state.highScore < state.score) {
        state.highScore = state.score;
        localStorage.setItem("highscore", state.score);
      }
    }
    $("highScore").innerText = state.highScore;
  },

  clearTimers: () => {
    state.timer && window.clearInterval(state.timer);
    state.timeOutTimer && window.clearTimeout(state.timeOutTimer);
  },
  updateScore: (score = 0) => {
    state.score = score;
    state.scoreUpdated = true;
    $("score").innerText = state.score;
    state.updateHighScore();
  },

  changeBoardSize: (level = state.effortLevel.easy) => {
    console.log(level);
    state.NxN = state.effortLevel[level];
    render();
    state.startTheGame();
  },

  updateTimeLeft: () => {
    $("timer").innerHTML = state.timeLeft;
  },
  startTheGame: () => {
    state.timeLeft = 120;
    state.clearTimers();
    state.clearActive();
    state.updateTimeLeft();
    state.updateScore(0);
    state.timer = setInterval(() => {
      state.clearActive();
      let random = parseInt(Math.random() * (state.NxN[0] * state.NxN[1]), 10);

      state.cells[random].style.background = "green";
      state.active = random;
      state.scoreUpdated = false;
      state.updateTimeLeft(state.timeLeft--);
    }, 1000);
    setTimeout(() => {
      window.clearInterval(state.timer);
      state.clearActive();
      alert("gave over");
      state.updateHighScore();

      state.timer = 0;
      state.startTheGame();
    }, 120000);
  },
  cellClicked: (e) => {
    if (state.timer) {
      let id = Number(e.currentTarget.id.split("-")[1]);

      if (state.active === id) {
        !state.scoreUpdated && state.updateScore(state.score + 1);
      } else {
        state.updateScore(state.score - 1);
      }
    }
  }
};

state.NxN = state.effortLevel.easy;
