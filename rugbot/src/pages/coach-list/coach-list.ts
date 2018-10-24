import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-coach-list',
  templateUrl: 'coach-list.html',
})
export class CoachListPage {

  thumbBlack = "assets/imgs/thumb-up.png";
  thumbGreen = "assets/imgs/thumb-up-green.png";

  users: Observable<any[]>;
  attendance: Observable<any[]>;

  date: Date = new Date();
  marks = [];
  // attendance = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, public afd: AngularFireDatabase,
    private toaster: ToastController) {
  }

  mark(user) {
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
    let alert = this.alertCtrl.create({
      title: user.name + " " + user.surname,
      subTitle: user.comment,
      buttons: ['Close']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoachListPage');

    this.attendance = this.afd.list('/attendance',
      ref => ref.orderByChild('date').equalTo(this.date + "")).valueChanges();
  }

  ngOnInit() {
    this.users = this.afd.list('/users',
      ref => ref.orderByChild('surname')).valueChanges();
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

  userDetails(user) {
    // TODO
    window.alert(user.name);
  }
}
