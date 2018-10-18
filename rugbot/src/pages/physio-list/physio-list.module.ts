import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhysioListPage } from './physio-list';

@NgModule({
  declarations: [
    PhysioListPage,
  ],
  imports: [
    IonicPageModule.forChild(PhysioListPage),
  ],
})
export class PhysioListPageModule { }
