import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';

import { PhysioListPage } from '../physio-list/physio-list';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { LoginPage } from '../login/login';
import { CoachListPage } from '../coach-list/coach-list';
import { PlayerAttendencePage } from '../player-attendence/player-attendence';
import { CalendarPage } from '../calendar/calendar';
import { PlayerDetailsPage } from '../player-details/player-details';
import { AttendenceHistoryPage } from '../attendence-history/attendence-history';
import { OtherPage } from '../other/other';

import { MenuController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  name = "Welcome!"; // tmp message for loading
  userType = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afa: AngularFireAuth, public menuCtrl: MenuController,
    private toaster: ToastController, private modalCtrl: ModalController,
    public plt: Platform, public afd: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    // let email = "stefbuys21@gmail.com"; // TODO
    const email = this.afa.auth.currentUser.email + "";

    this.afd.list('/users',
      ref => ref.orderByChild('email').equalTo(email)).valueChanges()
      .subscribe((data: any) => {
        for (let user of data) {
          this.name = user.name + " " + user.surname;
          this.userType = user.type;
          console.log('Current user: ' + this.name);
        }
      });

    let toast = this.toaster.create({
      message: 'Drag right to open the menu',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  buttonStatusCoach(): boolean {
    if (this.userType == 'coach') {
      return false;
    }
    return true;
  }

  buttonStatusPhysio(): boolean {
    if (this.userType == 'physio') {
      return false;
    }
    return true;
  }

  buttonStatusDetails(): boolean {
    if (this.userType == 'player') {
      return false;
    }
    return true;
  }

  buttonStatusCalendar(): boolean {
    if (this.userType == 'coach' || this.userType == 'player') {
      return false;
    }
    return true;
  }

  buttonStatusTest(): boolean {
    if (this.userType == 'coach') {
      return false;
    }
    return true;
  }


  showPhysio() {
    this.navCtrl.push(PhysioListPage); //.then(res => {
    //   if(res == false) {
    //     let alert = this.alertCtrl.create({
    //       title: 'No Entry!',
    //       subTitle: 'You shall not pass!',
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //   }
    // });
  }

  showCoach() {
    this.navCtrl.push(CoachListPage);
    // this.menuCtrl.close();
  }

  showCalendar() {
    this.navCtrl.push(CalendarPage);
  }

  logout() {
    // let toast = this.toaster.create({
    //   message: 'Goodbye(:',
    //   duration: 1000,
    //   position: 'bottom'
    // });
    // toast.present();

    this.afa.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
    // this.menuCtrl.close();
  }

  test() {
    this.navCtrl.push(AttendenceHistoryPage);
    // this.menuCtrl.close();
  }

  modal() {

  }

  mailto(email) {
    // this.plt.ready().then(() => {
    //   window.open('mailto:' + email);
    // });
    this.navCtrl.push(PlayerDetailsPage);
  }

  misc() {
    this.navCtrl.push(OtherPage);
  }

  exit() {
    this.plt.exitApp();
  }

  userList() {

  }
}
