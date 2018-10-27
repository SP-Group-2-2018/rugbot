import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'player-details',
  templateUrl: 'player-details.html',
})
export class PlayerDetails {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public plt: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerDetailsPage');
  }

  mailto(email) {
    this.plt.ready().then(() => {
      window.open('mailto:' + email);
    });
  }
}
