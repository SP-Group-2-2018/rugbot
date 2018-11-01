import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { PlayerDetailsPage } from '../player-details/player-details';

import { AlertController } from 'ionic-angular'
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-physio-list',
  templateUrl: 'physio-list.html',
})
export class PhysioListPage {

  isPhysio = false;

  users: Observable<any[]>;
  tasks: AngularFireList<any>;
  date: Date = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afd: AngularFireDatabase, private alertCtrl: AlertController) {

    this.tasks = afd.list('users');
  }

  ionViewDidLoad() {
    this.users = this.afd.list('/users/', reg =>
      reg.orderByChild('type').equalTo('player')).valueChanges();

    let email = "stefbuys21@gmail.com"; // TODO
    // let email = this.afa.auth.currentUser.email + "";

    this.afd.list('/users',
      ref => ref.orderByChild('email').equalTo(email)).valueChanges()
      .subscribe((data: any) => {
        for (let user of data) {
          console.log('User type ' + user.type.toLowerCase() + " (" + (user.type == 'physio') + ")");
          this.isPhysio = user.type.toLowerCase() == 'physio';
        }
      });
  }

  edit(user) {
    if (!this.isPhysio) {
      let alert = this.alertCtrl.create({
        title: 'Access Denied',
        subTitle: 'This field can only be edited by physiotherapists.',
        buttons: ['Close']
      });
      alert.present();
      return;
    }
    let alert = this.alertCtrl.create({
      title: 'Status',
      // value: user.status,
      inputs: [
        {
          // value: user.status,
          name: 'comment',
          placeholder: 'comment...'
        },
        {
          name: 'playDate',
          placeholder: 'Ready for practise',
          type: 'date'
        }
      ],
      //date: Date = new Date();,
      // TODO horizontal buttons
      buttons: [
        {
          text: 'A Okay',
          role: 'ok',
          handler: data => {
            user.status = 'Okay';
            user.comment = data.comment;
            user.playDate = data.playDate;
            console.log('player marked as ok');
            user.statusColour = 'good';
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
              playDate: user.playDate + "",
            });
          }
        },
        {
          text: 'Injured',
          role: 'injured',
          handler: data => {
            user.status = 'Injured';
            user.comment = data.comment;
            user.statusColour = 'threat';
            user.playDate = data.playDate;
            console.log('player marked as injured');
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
              playDate: user.playDate + "",
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
            user.playDate = data.playDate;
            console.log('player marked as dead');
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
              playDate: user.playDate + "",
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

  userDetails(user) {
    this.navCtrl.push(PlayerDetailsPage);
  }
}
