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

import { MenuController, ToastController } from 'ionic-angular';

import { AboutPage } from '../about/about';

@IonicPage()
@Component({
  selector: 'page-other',
  templateUrl: 'other.html',
})
export class OtherPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherPage');
  }

  about() {
    this.navCtrl.push(AboutPage);
  }

  manual() {

  }

  github() {

  }

  help() {

  }
}
