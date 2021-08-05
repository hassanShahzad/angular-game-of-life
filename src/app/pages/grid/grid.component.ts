import { Component, Input, OnInit } from '@angular/core';

import { Cell } from '../../helper/cell';
import { GameService } from '../../services/game.service';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
 @Input() rows: number;
  @Input() columns: number;
  grid: Cell[][];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.grid = this.gameService.getGrid();
  }

  changeState(cell: Cell) {
    cell.changeState();
  }
}