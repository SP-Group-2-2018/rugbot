import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PhysioListPage } from '../physio-list/physio-list';
import { AngularFireAuth } from '@angular/fire/auth';

import { LoginPage } from '../login/login';
import { CoachListPage } from '../coach-list/coach-list';
import { PlayerAttendencePage } from '../player-attendence/player-attendence';
import { CalendarPage } from '../calendar/calendar';

import { MenuController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afa: AngularFireAuth, public menuCtrl: MenuController,
    private toaster: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    let toast = this.toaster.create({
      message: 'Drag right to open the menu',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  showPhysio() {
    // console.log('hello, this button works');
    this.navCtrl.push(PhysioListPage);
    // this.menuCtrl.close();
  }

  showCoach() {
    this.navCtrl.push(CoachListPage);
    // this.menuCtrl.close();
  }

  showCalendar() {
    this.navCtrl.push(CalendarPage);
  }

  logout() {
    let toast = this.toaster.create({
      message: 'Goodbye(:',
      duration: 1000,
      position: 'bottom'
    });
    toast.present();

    this.afa.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
    // this.menuCtrl.close();
  }

  test() {
    this.navCtrl.push(PlayerAttendencePage);
    // this.menuCtrl.close();
  }
}
