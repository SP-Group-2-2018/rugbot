import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePlayerPage } from './home-player';

@NgModule({
  declarations: [
    HomePlayerPage,
  ],
  imports: [
    IonicPageModule.forChild(HomePlayerPage),
  ],
})
export class HomePlayerPageModule {}
