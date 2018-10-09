import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhysioFormPage } from './physio-form';

@NgModule({
  declarations: [
    PhysioFormPage,
  ],
  imports: [
    IonicPageModule.forChild(PhysioFormPage),
  ],
})
export class PhysioFormPageModule {}
