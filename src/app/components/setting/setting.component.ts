import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
   private intervalId: number;
  private _isPlaying: boolean;

  constructor(private gameService: GameService) {}

  get isPlaying() {
    return this._isPlaying;
  }

  ngOnInit(): void {
    this.start();
  }

  start(): void {
    this.intervalId = window.setInterval(() => {
    this.gameService.nextTurn();    }, 300);
    this._isPlaying = true;
  }

  stop(): void {
    window.clearInterval(this.intervalId);
    this._isPlaying = false;
  }

  getcounter(): number {
    return this.gameService.counter;
  }

  reset(): void {
    this.stop();
    this.gameService.reset();
  }

}
