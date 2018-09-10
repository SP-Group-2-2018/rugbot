import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoachRegisterPage } from './coach-register';

@NgModule({
  declarations: [
    CoachRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(CoachRegisterPage),
  ],
})
export class CoachRegisterPageModule {}
