import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoachAttendencePage } from './coach-attendence';

@NgModule({
  declarations: [
    CoachAttendencePage,
  ],
  imports: [
    IonicPageModule.forChild(CoachAttendencePage),
  ],
})
export class CoachAttendencePageModule { }
