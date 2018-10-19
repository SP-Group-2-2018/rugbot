import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';

// import { FirebaseProvider } from '../../providers/firebase/firebase';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@IonicPage()
@Component({
  selector: 'page-coach-list',
  templateUrl: 'coach-list.html',
})
export class CoachListPage {

  // attend: ;
  users: Observable<any[]>;
  public usersAtPractice: String[] = [];
  // date: DatePickerDirective;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, public afd: AngularFireDatabase) {
  }

  mark(user) {
    let id = this.date + " " + user.uid;
    this.afd.list('/attendance/').update(id,
      { date: this.date, uid: user.uid });
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
}
