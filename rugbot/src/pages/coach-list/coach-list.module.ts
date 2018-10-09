import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoachListPage } from './coach-list';

@NgModule({
  declarations: [
    CoachListPage,
  ],
  imports: [
    IonicPageModule.forChild(CoachListPage),
  ],
})
export class CoachListPageModule {}
