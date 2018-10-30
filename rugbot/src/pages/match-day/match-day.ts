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

@IonicPage()
@Component({
  selector: 'page-match-day',
  templateUrl: 'match-day.html',
})
export class MatchDayPage {

  date = "";

  isCoach = false;

  thumbBlack = "assets/imgs/thumb-up.png";
  thumbGreen = "assets/imgs/thumb-up-green.png";

  users: Observable<any[]>;
  teams: Observable<any[]>;

  marks = [];
  // teams = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, public afd: AngularFireDatabase,
    private toaster: ToastController) {
    this.date = "2018-10-30";
  }

  mark(user) {
    if (!this.isCoach) {
      let alert = this.alertCtrl.create({
        title: 'Access Denied',
        subTitle: 'This field can only be edited by coaches.',
        buttons: ['Close']
      });
      alert.present();
      return;
    }
    let id = this.date + " " + user.uid;
    if (this.f(user)) {
      this.afd.list('/teams/').remove(id);
    } else {
      this.afd.list('/teams/').update(id,
        { date: this.date + "", uid: user.uid });

      let toast = this.toaster.create({
        message: user.name + ' ' + user.surname + ' was added successfully',
        duration: 1000,
        position: 'bottom'
      });
      toast.present();
    }
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


  userDetails(user) {
    this.navCtrl.push(PlayerDetailsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoachListPage');

    this.teams = this.afd.list('/teams',
      ref => ref.orderByChild('date').equalTo(this.date + "")).valueChanges();


    let email = "stefbuys21@gmail.com"; // TODO
    // let email = this.afa.auth.currentUser.email + "";

    this.afd.list('/users',
      ref => ref.orderByChild('email').equalTo(email)).valueChanges()
      .subscribe((data: any) => {
        for (let user of data) {
          console.log('User type ' + user.type + " (" + (user.type == 'coach') + ")");
          this.isCoach = user.type.toLowerCase() == 'coach';
        }
      });

    this.afd.list('/teams',
      ref => ref.orderByChild('date').equalTo(this.date + "")).valueChanges()
      .subscribe((data) => {
        // for (let i of data) {
        //   console.log(i);
        // }
        this.marks = data;
      });
  }

  ngOnInit() {
    this.users = this.afd.list('/users',
      ref => ref.orderByChild('type').equalTo('player')).valueChanges();
  }

  f(user) {
    for (let i of this.marks) {
      console.log(i.uid + " " + user.id);
      if (i.uid == user.uid) {
        return true;
      }
    }
    return false;
  }

  setNumber(player) {

  }
}
