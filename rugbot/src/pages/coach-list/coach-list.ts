import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';

import { AngularFireModule, FirebaseListObservable } from 'angularfire2';
// import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-coach-list',
  templateUrl: 'coach-list.html',
})
export class CoachListPage {

  thumbBlack = "assets/imgs/thumb-up.png";
  thumbGreen = "assets/imgs/thumb-up-green.png";

  // attend: ;
  users: FirebaseListObservable<any[]>;
  public usersAtPractice: String[] = [];

  date: Date = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, public afd: AngularFireDatabase,
    private toaster: ToastController) {
  }

  mark(user) {
    let id = this.date + " " + user.uid;
    this.afd.list('/attendance/').update(id,
      { date: this.date, uid: user.uid });

    let toast = this.toaster.create({
      message: user.name + ' ' + user.surname + ' was added successfully',
      duration: 1000,
      position: 'bottom'
    });
    toast.present();
  }

  //does not work...
  pushToFire() {
    // this.afd.list('/attendance/').push({ key: this.date, uid: this.uid });
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
  }

  ngOnInit() {
    this.users = this.afd.list('/users').valueChanges();
  }

  asd(user) {
    let id = this.date + " " + user.uid;
    return true;
  }
}
