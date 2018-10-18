import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';

import { AlertController } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-physio-list',
  templateUrl: 'physio-list.html',
})
export class PhysioListPage {

  users: Observable<any[]>;
  tasks: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afd: AngularFireDatabase, private alertCtrl: AlertController) {

    this.tasks = afd.list('users');
  }

  ionViewDidLoad() {
    this.initUsers();
  }

  initUsers() {
    this.users = this.afd.list('users').valueChanges();
  }

  edit(user) {
    let alert = this.alertCtrl.create({
      title: 'Status',
      value: user.status,
      inputs: [
        {
          value: "sdf",
          name: 'comment',
          placeholder: 'comment...'
        }
      ],
      // TODO horzontal buttons
      buttons: [
        {
          text: 'A Okay',
          role: 'ok',
          handler: data => {
            user.status = data.comment;
            console.log('player maked as ok');
            user.statusColour = 'secondary';

            this.tasks.update(user.uid, { status: user.status });
          }
        },
        {
          text: 'Injured',
          role: 'injured',
          handler: data => {
            user.status = data.comment;
            user.statusColour = 'danger';
            console.log('player marked as injured'); // TODO
          }
        },
        {
          text: 'No play',
          role: 'dead',
          handler: data => {
            user.status = data.comment;
            user.statusColour = 'dark';
            console.log('player marked as dead'); // TODO
          }
        }
        // Matthew 18/10/2018: Not readlly needed
        /*,
        {
          text: 'Close',
          role: 'cancel',
          handler: data => {
            console.log('Closing status window');
          }
        }*/
      ]
    });
    alert.present();
  }
}
