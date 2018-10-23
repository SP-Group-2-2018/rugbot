import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhysioRegPage } from './physio-reg';

@NgModule({
  declarations: [
    PhysioRegPage,
  ],
  imports: [
    IonicPageModule.forChild(PhysioRegPage),
  ],
})
export class PhysioRegPageModule { }
