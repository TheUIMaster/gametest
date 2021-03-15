import { state } from "../state";
import { $ } from "../$";

export let header = () => {
  if (state.highScore != null) {
    let optionsHtml = Object.keys(state.effortLevel)
      .map(
        (key) =>
          "<option value='" +
          key +
          "'>" +
          key +
          ": " +
          state.effortLevel[key].join("x") +
          "</option>"
      )
      .join("");
    debugger;
    console.log(optionsHtml);
    if ($("difficulty")) {
      $("difficulty").innerHTML = optionsHtml;
    }
  }
  $("difficulty").addEventListener("change", (e) =>
    state.changeBoardSize(e.currentTarget.value)
  );
  $("restart").addEventListener("click", state.startTheGame);
};
