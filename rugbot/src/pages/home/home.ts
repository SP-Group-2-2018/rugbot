import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
    private toaster: ToastController, public alertCtrl: AlertController) {
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
    this.navCtrl.push(PhysioListPage).then(res => {
      if(res == false) {
        let alert = this.alertCtrl.create({
          title: 'No Entry!',
          subTitle: 'You shall not pass!',
          buttons: ['OK']
        });
        alert.present();
      }
    });
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
