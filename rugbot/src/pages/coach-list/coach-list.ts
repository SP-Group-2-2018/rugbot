import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { PlayerDetailsPage } from '../player-details/player-details';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-coach-list',
  templateUrl: 'coach-list.html',
})
export class CoachListPage {

  isCoach = false;

  thumbBlack = "assets/imgs/thumb-up.png";
  thumbGreen = "assets/imgs/thumb-up-green.png";

  users: Observable<any[]>;
  attendance: Observable<any[]>;

  date: string = new Date().toJSON();
  marks = [];
  // attendance = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, public afd: AngularFireDatabase,
    private toaster: ToastController) {
  }

  searchUser(searchTerm) {
    this.users = this.afd.list('/users',
    ref => ref.orderByChild('name').equalTo(searchTerm)).valueChanges();

    // this.attendance = this.afd.list('/attendance',
    //   ref => ref.orderByChild('date').equalTo(this.date + "")).valueChanges();
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
      this.afd.list('/attendance/').remove(id);
    } else {
      this.afd.list('/attendance/').update(id,
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
    if (user.playDate != null && user.status.toLowerCase() != 'play') {
      message = message + "<br><br>" + "Estimate date of recovery:<br>" + user.playDate;
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

    this.attendance = this.afd.list('/attendance',
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

    this.date = new Date().toJSON().split('T')[0];
  }

  ngOnInit() {
    this.users = this.afd.list('/users',
      ref => ref.orderByChild('type').equalTo('player')).valueChanges();

    // this.users = this.afd.list('/users',
    //   ref => ref.orderByChild('surname').equalTo('a')).valueChanges();
  }

  // TODO matthew 22/10/2018: RENAME
  f(user) {
    for (let i of this.marks) {
      if (i.uid == user.uid) {
        return true;
      }
    }
    return false;
  }

  dateChange() {
    this.attendance = this.afd.list('/attendance',
      ref => ref.orderByChild('date').equalTo(this.date + "")).valueChanges();

    this.afd.list('/attendance',
      ref => ref.orderByChild('date').equalTo(this.date + "")).valueChanges()
      .subscribe((data) => {
        // for (let i of data) {
        //   console.log(i);
        // }
        this.marks = data;
      });
  }

  onSearchInput() {
    // let results = [];
    // this.afd.list('/users',
    //   ref => ref.orderByChild('surname')).valueChanges()
    //   .subscribe(items => {
    //     items.forEach(item => {
    //       if (item.surname.startsWith(this.txtSearch)) {
    //         results.push(item);
    //       }
    //     });
    //   });
    // this.users = results;
  }

  onCancel() {
    this.attendance = this.afd.list('/attendance',
      ref => ref.orderByChild('date').equalTo(this.date + "")).valueChanges();
  }
}
