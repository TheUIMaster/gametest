import {buildCell } from "./BuildCell";
import {$} from "../$";

export let render = () => {
    $("board").appendChild(buildCell());
};

