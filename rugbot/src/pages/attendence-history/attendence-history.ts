import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

// import { AttendenceHistoryPage } from './attendence-history/attendence-history';
import { PlayerAttendencePage } from '../player-attendence/player-attendence';
import { PlayerDetailsPage } from '../player-details/player-details';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-attendence-history',
  templateUrl: 'attendence-history.html',
})
export class AttendenceHistoryPage {

  players: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afd: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendenceHistoryPage');
    this.players = this.afd.list('/users/', reg =>
      reg.orderByChild('type').equalTo('player')).valueChanges();
  }

  history(player) {
    this.navCtrl.push(PlayerAttendencePage);
  }

  details(player) {
    this.navCtrl.push(PlayerDetailsPage, {user: player.uid});
  }
}
