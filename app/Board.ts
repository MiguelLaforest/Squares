import Cell from "./Cell";
import Player from "./Player";
import { HLine, VLine } from "./Line";

export default class Board {
  private MIN_BOARD_SIZE: number = 2;
  private MAX_BOARD_SIZE: number = 20;

  private MIN_PLAYERS_AMOUNT: number = 2;
  private MAX_PLAYERS_AMOUNT: number = 5;

  board: HTMLDivElement;
  board_size: number = 4;

  cells: Cell[][] = new Array<Array<Cell>>();
  horizontals: HLine[] = [];
  verticals: VLine[] = [];

  players_size: number = 2;
  players: Player[] = [];
  playersPanel: HTMLDivElement;
  currentPlayer: Player;

  constructor() {
    this.board = <HTMLDivElement>document.getElementById("board");
    this.playersPanel = <HTMLDivElement>document.getElementById("players");

    this.board.addEventListener("click", () => {
      if (this.full()) {
        this.finished();
      }

      this.players_display();
    });

    this.initialize_game();
    this.display_game();
  }

  initialize_game() {
    this.players_init();
    this.cells_init();
    this.lines_init();
  }

  display_game() {
    this.board.innerHTML = "";
    this.players_display();
    this.current_player_display();
    this.cells_display();
    this.lines_display();
  }

  /**
 *
 * COMPONENTS INITIALIZATION
 *
 */

  players_init() {
    this.players = [];

    for (let i = 0; i < this.players_size + 2; i++) {
      this.players.push(new Player(i));
    }

    this.currentPlayer = this.players[0];
  }

  board_init() {
    const board = document.getElementById("board");

    board.addEventListener("click", () => {
      if (this.full()) {
        this.finished();
      }
      this.players_display();
    });
  }

  cells_init() {
    this.cells = new Array<Array<Cell>>();

    for (let row = 0; row < this.board_size; row++) {
      this.cells.push([]);
      for (let col = 0; col < this.board_size; col++) {
        const cell = new Cell(row, col, this.board_size);
        this.cells[row].push(cell);
      }
    }
  }

  lines_init() {
    this.horizontals = [];
    this.verticals = [];

    for (let row = 0; row < this.board_size + 1; row++) {
      for (let col = 0; col < this.board_size; col++) {
        this.horizontals.push(new HLine(row, col, this.board_size));
      }
    }

    for (let row = 0; row < this.board_size; row++) {
      for (let col = 0; col < this.board_size + 1; col++) {
        this.verticals.push(new VLine(row, col, this.board_size));
      }
    }
  }

  /**
   *
   * COMPONENTS DISPLAY
   *
   */

  players_display() {
    this.playersPanel.innerHTML = "";

    let players = [ ...this.players ];

    players
      .sort((a, b) => {
        return b.score - a.score;
      })
      .map(player => {
        const span = document.createElement("span");
        span.innerText = `${player.name}: ${player.score}`;
        span.style.color = player.token;
        return span;
      })
      .forEach(player => {
        this.playersPanel.appendChild(player);
      });
  }

  current_player_display() {
    const playerDisplay = document.getElementById("current-player");
    playerDisplay.innerText = this.currentPlayer.name;
  }

  cells_display() {
    for (let row of this.cells) {
      for (let cell of row) {
        this.board.appendChild(cell.body);
      }
    }
  }

  lines_display() {
    for (const line of this.horizontals) {
      line.body.addEventListener("click", () => {
        if (!line.isSet) {
          const row = line.row;
          const col = line.column;
          const token = this.currentPlayer.token;

          if (row == 0) {
            this.cells[row][col].top = true;
            if (this.cells[row][col].completed(token)) {
              this.currentPlayer.win();
            } else {
              this.nextPlayer();
            }
          } else if (row == this.board_size) {
            this.cells[row - 1][col].bottom = true;
            if (this.cells[row - 1][col].completed(token)) {
              this.currentPlayer.win();
            } else {
              this.nextPlayer();
            }
          } else {
            this.cells[row - 1][col].bottom = true;

            this.cells[row][col].top = true;

            if (
              this.cells[row][col].completed(token) &&
              this.cells[row - 1][col].completed(token)
            ) {
              this.currentPlayer.win();
              this.currentPlayer.win();
            } else if (this.cells[row][col].completed(token)) {
              this.currentPlayer.win();
            } else if (this.cells[row - 1][col].completed(token)) {
              this.currentPlayer.win();
            } else {
              this.nextPlayer();
            }
          }
          line.set();
        }
      });
      this.board.appendChild(line.body);
    }

    for (const line of this.verticals) {
      this.board.appendChild(line.body);

      line.body.addEventListener("click", () => {
        if (!line.isSet) {
          const row = line.row;
          const col = line.column;
          const token = this.currentPlayer.token;
          if (col == 0) {
            this.cells[row][col].left = true;

            if (this.cells[row][col].completed(token)) {
              this.currentPlayer.win();
            } else {
              this.nextPlayer();
            }
          } else if (col == this.board_size) {
            this.cells[row][col - 1].right = true;
            if (this.cells[row][col - 1].completed(token)) {
              this.currentPlayer.win();
            } else {
              this.nextPlayer();
            }
          } else {
            this.cells[row][col - 1].right = true;
            this.cells[row][col].left = true;

            if (
              this.cells[row][col].completed(token) &&
              this.cells[row][col - 1].completed(token)
            ) {
              this.currentPlayer.win();
              this.currentPlayer.win();
            } else if (this.cells[row][col].completed(token)) {
              this.currentPlayer.win();
            } else if (this.cells[row][col - 1].completed(token)) {
              this.currentPlayer.win();
            } else {
              this.nextPlayer();
            }
          }
          line.set();
        }
      });
    }
  }

  /**
   *
   * BOARD CONTROL
   *
   */

  increaseSize() {
    if (this.board_size < this.MAX_BOARD_SIZE) {
      this.board_size++;

      this.initialize_game();
      this.display_game();
    }
  }

  decreaseSize() {
    if (this.board_size > this.MIN_BOARD_SIZE) {
      this.board_size--;

      this.initialize_game();
      this.display_game();
    }
  }

  increasePlayers() {
    if (this.players.length < this.MAX_PLAYERS_AMOUNT) {
      this.players_size++;

      this.initialize_game();
      this.display_game();
    }
  }

  decreasePlayers() {
    if (this.players.length > this.MIN_PLAYERS_AMOUNT) {
      this.players_size--;

      this.initialize_game();
      this.display_game();
    }
  }

  /**
   *
   * BOARD LOGIC
   *
   */

  displayBoard() {
    this.board.style.zIndex = "1";
    this.board.style.opacity = "1";
    this.hideScoreBoard();
  }

  hideBoard() {
    this.board.style.zIndex = "-1";
    this.board.style.opacity = "0";
  }

  displayScoreBoard() {
    const scoreBoard = document.getElementById("scoreboard");

    scoreBoard.style.zIndex = "1";
    scoreBoard.style.opacity = "1";

    this.hideBoard();
  }

  hideScoreBoard() {
    const scoreBoard = document.getElementById("scoreboard");

    scoreBoard.style.zIndex = "-1";
    scoreBoard.style.opacity = "0";
  }

  nextPlayer() {
    const current = this.currentPlayer.id;
    const next = current + 1 >= this.players.length ? 0 : current + 1;
    this.currentPlayer = this.players[next];
    this.current_player_display();
  }

  winner() {
    let winner = null;

    winner = this.players.sort((a, b) => {
      return b.score - a.score;
    });

    winner = winner.filter((player: Player) => {
      return player.score == winner[0].score;
    });

    return winner.length > 1 ? null : winner[0];
  }

  full() {
    return this.cells.every(row => row.every(cell => cell.completed()));
  }

  finished() {
    const winner = this.winner();
    const display = document.getElementById("winner");

    if (winner) {
      display.innerHTML = winner.name + " WINS";
    } else {
      display.innerHTML = "TIE";
    }

    this.displayScores();
    this.displayScoreBoard();
  }

  reset() {
    this.initialize_game();
    this.display_game();
    this.displayBoard();
  }

  displayScores() {
    const names = document.querySelector(".names");
    const scores = document.querySelector(".score");
    let players = [ ...this.players ];

    names.innerHTML = "";
    scores.innerHTML = "";

    players = players.sort((a, b) => {
      return b.score - a.score;
    });

    players
      .map(player => {
        const span = document.createElement("span");
        span.innerText = `P${player.id + 1}`;
        return span;
      })
      .forEach(player => {
        names.appendChild(player);
      });

    players
      .map(player => {
        const span = document.createElement("span");
        span.innerText = `${player.score}`;
        return span;
      })
      .forEach(player => {
        scores.appendChild(player);
      });
  }
}
