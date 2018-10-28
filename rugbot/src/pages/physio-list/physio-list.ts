import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { AlertController } from 'ionic-angular'
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@IonicPage()
@Component({
  selector: 'page-physio-list',
  templateUrl: 'physio-list.html',
})
export class PhysioListPage {

  isPhysio = false;

  users: Observable<any[]>;
  tasks: AngularFireList<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afd: AngularFireDatabase, public afa: AngularFireAuth, private alertCtrl: AlertController) {

    this.tasks = afd.list('/users/');
  }

  // ionViewCanEnter() {
  //   let uid: string = this.afa.auth.currentUser.uid;
  //   // let exists = false;
  //   // let usersArray: string[];
  //   // console.log(uid);
  //   const user = this.afd.object('/users/' + uid);
  //   let name;
  //   user.snapshotChanges().subscribe(a => {
  //     name = a.payload.hasChild('name');
  //   });
  //   console.log(name);
  // }

  ionViewDidLoad() {
    this.users = this.afd.list('/users/', reg => 
      reg.orderByChild('type').equalTo('Player')).valueChanges();

    let email = "stefbuys21@gmail.com"; // TODO
    // let email = this.afa.auth.currentUser.email + "";

    this.afd.list('/users',
      ref => ref.orderByChild('email').equalTo(email)).valueChanges()
      .subscribe((data: any) => {
        for (let user of data) {
          console.log('User type ' + user.userType + " (" + (user.userType == 'physio') + ")");
          this.isPhysio = user.type == 'physio';
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
          name: 'title',
          placeholder: 'Title',
          type: 'date'
        }
      ],
      // TODO horizontal buttons
      buttons: [
        {
          text: 'A Okay',
          role: 'ok',
          handler: data => {
            user.status = 'Okay';
            user.comment = data.comment;
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
    // TODO
    window.alert(user.name);
  }
}
