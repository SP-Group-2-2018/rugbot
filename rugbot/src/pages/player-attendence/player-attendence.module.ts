import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerAttendencePage } from './player-attendence';

@NgModule({
  declarations: [
    PlayerAttendencePage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerAttendencePage),
  ],
})
export class PlayerAttendencePageModule { }
