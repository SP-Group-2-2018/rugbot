import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { AlertController } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-physio-list',
  templateUrl: 'physio-list.html',
})
export class PhysioListPage {

  users: AngularFireList<any[]>;
  tasks: AngularFireList<any[]>;

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
      // value: user.status,
      inputs: [
        {
          // value: user.status,
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
            user.status = 'Okay';
            user.comment = data.comment;
            console.log('player maked as ok');
            user.statusColour = 'secondary'; // TODO set colour
            // this.tasks.remove(user.$key);
            this.tasks.update(user.uid + "", {
              status: user.status + "",
              uid: user.uid + "",
              email: user.email + "",
              statusColour: user.statusColour + "",
              name: user.name + "",
              surname: user.surname + "",
              type: user.type + "",
              comment: user.comment + "",
            });
          }
        },
        {
          text: 'Injured',
          role: 'injured',
          handler: data => {
            user.status = 'Injured';
            user.comment = data.comment;
            user.statusColour = 'dark'; // TODO set colour
            console.log('player marked as injured'); // TODO
            // this.tasks.remove(user.$key);
            this.tasks.update(user.uid + "", {
              status: user.status + "",
              uid: user.uid + "",
              email: user.email + "",
              statusColour: user.statusColour + "",
              name: user.name + "",
              comment: user.comment + "",
              surname: user.surname + "",
              type: user.type + "",
            });
          }
        },
        {
          text: 'No play',
          role: 'dead',
          handler: data => {
            user.status = 'No play';
            user.comment = data.comment + "";
            user.statusColour = 'danger';
            console.log('player marked as dead'); // TODO
            // this.tasks.remove(user.$key);
            this.tasks.update(user.uid + "", {
              status: user.status + "",
              uid: user.uid + "",
              email: user.email + "",
              comment: user.comment + "",
              statusColour: user.statusColour + "",
              name: user.name + "",
              surname: user.surname + "",
              type: user.type + "",
            });
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

  // update(user) {
  //   this.tasks.remove(user.$key);
  //   this.tasks.update(user.uid, {
  //     status: user.status,
  //     uid: user.uid,
  //     email: user.email,
  //     statusColour: user.statusColour,
  //     name: user.name,
  //     surname: user.surname,
  //     type: user.type
  //   });
  // }
}
