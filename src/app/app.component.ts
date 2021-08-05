import { Component } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Game-of-life';
  rows = 25;
  columns = 50;

  constructor(private gameService: GameService) {}

  ngOnInit() : void {
    this.gameService.initialize(this.rows, this.columns);
  }
}
