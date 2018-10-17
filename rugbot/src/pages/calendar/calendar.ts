import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Calendar } from '@ionic-native/calendar';

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private calendar: Calendar) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

}
