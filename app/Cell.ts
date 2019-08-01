export default class Cell {
  size: number = 0;
  private _body: HTMLDivElement = document.createElement("div");
  row: number = 0;
  column: number = 0;

  top: boolean = false;
  bottom: boolean = false;
  left: boolean = false;
  right: boolean = false;

  constructor(row: number, column: number, size: number) {
    this.row = row;
    this.column = column;
    this.size = size;
    this.body.className = "cell";
    this.body.style.width = `calc(100% / ${this.size})`;
    this.body.style.height = `calc(100% / ${this.size})`;
  }

  get body(): HTMLDivElement {
    return this._body;
  }

  completed(token?: string): boolean {
    if (this.top && this.bottom && this.left && this.right) {
      if (token !== undefined) this.body.style.backgroundColor = token;
      return true;
    }

    return false;
  }
}
