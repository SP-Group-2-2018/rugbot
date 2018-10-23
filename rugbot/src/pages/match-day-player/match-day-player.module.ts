import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchDayPlayerPage } from './match-day-player';

@NgModule({
  declarations: [
    MatchDayPlayerPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchDayPlayerPage),
  ],
})
export class MatchDayPlayerPageModule { }
