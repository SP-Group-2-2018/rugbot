import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerDetails } from './player-details';

@NgModule({
  declarations: [
    PlayerDetails,
  ],
  imports: [
    IonicPageModule.forChild(PlayerDetails),
  ],
})
export class PlayerDetailsModule { }
