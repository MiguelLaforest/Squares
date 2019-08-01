export default class Player {
  id: number;
  name: string;
  token: string;
  private _score: number = 0;
  colors = [
    "hsl(000, 60%, 60%)",
    "hsl(039, 60%, 60%)",
    "hsl(300, 60%, 35%)",
    "hsl(240, 60%, 60%)",
    "hsl(120, 60%, 35%)"
  ];

  constructor(id: number) {
    this.name = "Player-" + (id + 1);
    this.token = this.colors[id];
    this.id = id;
  }

  win() {
    this.score += 1;
  }

  get score() {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }
}
