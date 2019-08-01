import Board from "./Board";

const board = new Board();
const reset = document.getElementById("reset");
const restart = document.getElementById("restart");

reset.addEventListener("click", () => {
  board.reset();
});

restart.addEventListener("click", () => {
  board.reset();
});

document.getElementById("size+").addEventListener("click", () => {
  board.increaseSize();
});

document.getElementById("size-").addEventListener("click", () => {
  board.decreaseSize();
});

document.getElementById("player+").addEventListener("click", () => {
  board.increasePlayers();
});

document.getElementById("player-").addEventListener("click", () => {
  board.decreasePlayers();
});
