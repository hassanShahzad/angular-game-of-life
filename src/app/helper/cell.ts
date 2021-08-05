export class Cell {
  private currentState = false;
  // This is where the cell's new state will be stored after
  // computing the next generation.
  private tempState = false;
  private _row: number;
  private _col: number;

  constructor(row: number, column: number) {
    this._row = row;
    this._col = column;
  }

  get row(): number {
    return this._row;
  }

  get col(): number {
    return this._col;
  }

  setTempState(state: boolean) {
    this.tempState = state;
  }

  changeState() {
    this.tempState = !this.tempState;
    this.updateCurrentState();
  }

  updateCurrentState() {
    this.currentState = this.tempState;
  }

  isActive(): boolean {
    return this.currentState;
  }

  reset() {
    this.currentState = false;
    this.tempState = false;

  }
}
