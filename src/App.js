import "./styles.css";
import { state } from "./state";
import { render } from "./Components/Board.js";
import { header } from "./Components/header";

state.app.innerHTML = ` <header>
Score:
<strong id="score"></strong><br />
High Score :
<strong id="highScore"></strong><br />
Timer:
<strong id="timer"></strong><br />
<br /> Level: <select id="difficulty"></select> <br />
</header>
<br />
<div><button id='restart'>Restart </buton></div>
<div id="board"></div>`;
// update high score initially from localstorage
state.updateHighScore(true);

// render header
header();
// render board
render();

state.startTheGame();
