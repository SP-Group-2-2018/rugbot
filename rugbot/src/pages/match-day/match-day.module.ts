import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchDayPage } from './match-day';

@NgModule({
  declarations: [
    MatchDayPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchDayPage),
  ],
})
export class MatchDayPageModule { }
