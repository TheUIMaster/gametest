import { state } from "../state";
import { $ } from "../$";
export let buildCell = () => {
  state.cells = [];
  let df = document.createDocumentFragment();
  for (let i = 0, t = 0; i < state.NxN[0]; i++) {
    let temp = [];
    for (let j = 0; j < state.NxN[1]; j++, t++) {
      let ele = document.createElement("span");
      ele.className = "cell";
      ele.id = "cell-" + t;
      // ele.innerText = t;
      ele.addEventListener("click", state.cellClicked);
      temp.push(ele);
      df.appendChild(ele);
    }
    let br = document.createElement("br");
    df.appendChild(br);
    state.cells.push(...temp);
    $("board").innerHTML = "";
  }
  return df;
};
