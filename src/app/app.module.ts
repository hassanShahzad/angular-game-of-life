import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridComponent } from './pages/grid/grid.component';
import { SettingComponent } from './components/setting/setting.component';
import { GameService } from './services/game.service';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    SettingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
