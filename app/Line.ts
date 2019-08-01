class Line {
  private _body: HTMLDivElement = document.createElement("div");
  thickness: number = 5;
  row: number;
  column: number;
  size: number;
  isSet: boolean = false;

  constructor(row: number, column: number, size: number) {
    this.row = row;
    this.column = column;
    this.size = size;

    this.body.className = "line";
    this.body.addEventListener("click", () => this.body.classList.add("set"));
  }

  get body(): HTMLDivElement {
    return this._body;
  }

  set() {
    this.isSet = true;
  }
}

export class HLine extends Line {
  constructor(row: number, column: number, size: number) {
    super(row, column, size);

    this.body.classList.add("horizontal");
    this.body.style.width = `calc(100% / ${this.size})`;
    this.body.style.top = `calc((100% / ${this.size}) * ${this.row})`;
    this.body.style.left = `calc((100% / ${this.size}) * ${this.column})`;
  }
}

export class VLine extends Line {
  constructor(row: number, column: number, size: number) {
    super(row, column, size);

    this.body.classList.add("vertical");
    this.body.style.height = `calc(100% / ${this.size})`;
    this.body.style.top = `calc((100% / ${this.size}) * ${this.row})`;
    this.body.style.left = `calc((100% / ${this.size}) * ${this.column})`;
  }
}
