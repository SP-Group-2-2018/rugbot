import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendenceHistoryPage } from './attendence-history';

@NgModule({
  declarations: [
    AttendenceHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendenceHistoryPage),
  ],
})
export class AttendenceHistoryPageModule {}
