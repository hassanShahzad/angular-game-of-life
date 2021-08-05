import { Injectable } from '@angular/core';
import { Cell } from '../helper/cell';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() { }
  private cells: Cell[];
  private rows: number;
  private columns: number;
  private _counter = 0;
  private isNextTurn = true;

  get counter(): number {
    return this._counter;
  }

  initialize(rows = 10, columns = 10) : void {
    this.rows = rows;
    this.columns = columns;
    this._counter = 0;
    this.cells = Array.from({
      length: rows * columns
    }).map((_, i) => new Cell(Math.floor(i / this.columns), i % this.columns));
  }

  makeCellsActive(percentageOfActiveCells = 0.3) {

    if (percentageOfActiveCells < 0 || 1 < percentageOfActiveCells) {
      throw Error(`percentageOfActiveCells must be a number between 0 and 1, inclusive. Value: ${percentageOfActiveCells}`);
    }
    this.reset();
    this.cells.forEach(cell => {
      if (Math.random() < percentageOfActiveCells) {
        cell.changeState();
      }
    });
  }

  getGrid(): Cell[][] {
    if (!this.cells) {
      throw Error('Grid has not yet been initialized.');
    }
    const grid = [];
    for (let i = 0; i < this.rows; i++) {
      grid.push(this.cells.slice(i * this.columns, (i + 1) * this.columns));
    }
    return grid;
  }

  reset(): void {
    if (!this.cells) {
      throw Error('Grid has not yet been initialized.');
    }

    this.cells.forEach(cell => cell.reset());
    this._counter = 0;
  }

  nextTurn(): void {
    if (!this.cells) {
      throw Error('Grid has not yet been initialized.');
    }
    if (this.isNextTurn && this._counter == 0) {
      this.makeCellsActive()
      this.isNextTurn = false
    }
    else {
      this.isNextTurn = true

    }

    const active = true; 
    this.cells.forEach(cell => {
      const activeNeighborCount = this.getNeighborsOfCell(cell)
        .filter(c => c.isActive())
        .length;

      switch (activeNeighborCount) {
        case 2: // cell remains as it is
       cell.setTempState(!active);
          break;
        case 3: // deactived cell becomes activated; activated cells remain activated
          cell.setTempState(active);
          break;
        default:  // activated cell becomes deactived; deactived cells remain deactived
          cell.setTempState(!active);
      }
    });
    this._counter++;
    this.updateCellStates();
  }

  /**
   * This will be called
   * after the computation of the new states.
   */
  private updateCellStates() : void {
    this.cells.forEach(cell => cell.updateCurrentState());
  }

  private getNeighborsOfCell(cell: Cell): Cell[] {
    if (this.isInValidCell(cell)) {
      throw Error('Cell coordinates are out of bounds.');
    }

    const { row, col } = cell;
    const possibleNeighborCoords = [
      { row: row - 1, col: col },
      { row: row - 1, col: col + 1 },
      { row: row, col: col + 1 },
      { row: row + 1, col: col + 1 },
      { row: row + 1, col: col },
      { row: row + 1, col: col - 1 },
      { row: row, col: col - 1 },
      { row: row - 1, col: col - 1}
    ].filter(offset => !this.isInValidCell(offset));
    
    return possibleNeighborCoords.map(coords => this.getCellAt(coords));
  }

  private getCellAt({row = 0, col = 0} = {}): Cell {
    if (this.isInValidCell({row, col})) {
      throw Error(`Cell coordinates are out of bounds. Bounds: ${this.rows} rows, ${this.columns} columns. Value: ${{row, col}}`);
    }

    return this.cells[row * this.columns + col];
  }

  private isInValidCell({row, col}): boolean {
    return this.isInValidRow(row) || this.isInValidColumn(col);
  }

  private isInValidRow(row) : boolean {
    return row < 0 || this.rows <= row;
  }

  private isInValidColumn(col) : boolean {
    return col < 0 || this.columns <= col;
  }
}