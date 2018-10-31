import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-match-day',
  templateUrl: 'match-day.html',
})
export class MatchDayPage {

  event = [];

  thumbBlack = "assets/imgs/thumb-up.png";
  thumbGreen = "assets/imgs/thumb-up-green.png";

  users: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afd: AngularFireDatabase, private alertCtrl: AlertController) {
       this.event = navParams.get('event');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchDayPage');

    this.users = this.afd.list('/users',
      ref => ref.orderByChild('type').equalTo('player')).valueChanges();

      // window.alert(this.event.title);
      console.log(this.event);
  }

  mark(user) {
    // if (!this.isCoach) {
    //   let alert = this.alertCtrl.create({
    //     title: 'Access Denied',
    //     subTitle: 'This field can only be edited by coaches.',
    //     buttons: ['Close']
    //   });
    //   alert.present();
    //   return;
    // }
    // let id = this.date + " " + user.uid;
    // if (this.f(user)) {
    //   this.afd.list('/attendance/').remove(id);
    // } else {0781823916
    //   this.afd.list('/attendance/').update(id,
    //     { date: this.date + "", uid: user.uid });
    //
    //   let toast = this.toaster.create({
    //     message: user.name + ' ' + user.surname + ' was added successfully',
    //     duration: 1000,
    //     position: 'bottom'
    //   });
    //   toast.present();
    // }
    window.alert('mark');
  }

  statusDetails(user) {
    let message = "<strong>" + user.comment + "</strong>";
    if (user.playDate != null && user.status.toLowerCase() != 'play'
      && user.status.toLowerCase() != 'okay') {
      message = message + "<br><br>" + "Estimate date of revocery:<br>" + user.playDate;
    }
    let alert = this.alertCtrl.create({
      title: user.name + " " + user.surname,
      subTitle: message,
      //lines above display data when butto clicked
      //only one shows, both supposed to show
      buttons: ['Close']
    });
    alert.present();
  }

  f(user) {
    // for (let i of this.marks) {
    //   if (i.uid == user.uid) {
    //     return true;
    //   }
    // }
    return false;
  }

  userDetails(user) {
    this.navCtrl.push(PlayerDetailsPage);
  }
}
