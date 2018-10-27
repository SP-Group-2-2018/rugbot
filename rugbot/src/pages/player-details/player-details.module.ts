import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerDetailsPage } from './player-details';

@NgModule({
  declarations: [
    PlayerDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerDetailsPage),
  ],
})
export class PlayerDetailsPageModule {}
