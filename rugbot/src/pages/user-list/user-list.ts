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
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {

  users: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afd: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserListPage');

    this.players();
  }

  players() {
    this.users = this.afd.list('/users',
      ref => ref.orderByChild('type').equalTo("player")).valueChanges();
  }

  physios() {
    this.users = this.afd.list('/users',
      ref => ref.orderByChild('type').equalTo("physio")).valueChanges();
  }

  coaches() {
    this.users = this.afd.list('/users',
      ref => ref.orderByChild('type').equalTo("coach")).valueChanges();
  }
}
