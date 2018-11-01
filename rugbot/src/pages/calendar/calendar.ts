import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';

import { MatchDayPage } from '../match-day/match-day';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

  isCoach = false;

  events: AngularFireList<any>;

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, private modalCtrl: ModalController,
    private alertCtrl: AlertController, public afd: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    this.events = this.afd.list('events');

    this.afd.list('/users',
      ref => ref.orderByChild('email').equalTo(email)).valueChanges()
      .subscribe((data: any) => {
        for (let user of data) {
          console.log('User type ' + user.type + " (" + (user.type == 'coach') + ")");
          this.isCoach = user.type.toLowerCase() == 'coach';
        }
      });

    let email = this.afa.auth.currentUser.email + "";
    this.afd.list('/events').valueChanges()
      .subscribe((data: any) => {
        for (let eventData of data) {
          console.log(eventData.uid + "");

          let n = this.eventSource;
          eventData.startTime = new Date(eventData.startTime);
          eventData.endTime = new Date(eventData.endTime);
          if (eventData.uid != null) {
            n.push(eventData);
          }
          this.eventSource = [];
          this.eventSource = n;
        }
      });
  }

  addEvent() {
    if (!this.isCoach) {
      let alert = this.alertCtrl.create({
        title: 'Access Denied',
        subTitle: 'This field can only be edited by coaches.',
        buttons: ['Close']
      });
      alert.present();
      return;
    }

    let modal = this.modalCtrl.create('EventModalPage', {
      selectedDay: this.selectedDay
    });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        let events = this.eventSource;
        if (eventData.uid != null) {
          events.push(eventData);
        }
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;

          let obj = this.events.push({
            startTime: eventData.startTime + "",
            endTime: eventData.endTime + "",
            title: eventData.title + ""
          });
          let uid = obj.key;
          this.events.update(uid, {
            uid: uid + ""
          });
        });
      }
    });

    // console.log(this.eventSource[0]);
    this.afd.list('/events').valueChanges()
      .subscribe((data: any) => {
        for (let eventData of data) {
          console.log(eventData.uid + "");

          let n = this.eventSource;
          eventData.startTime = new Date(eventData.startTime);
          eventData.endTime = new Date(eventData.endTime);
          if (eventData.uid != null) {
            n.push(eventData);
          }
          this.eventSource = [];
          this.eventSource = n;
        }
      });

    this.navCtrl.pop();
  }

  onTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    this.navCtrl.push(MatchDayPage, { 'evtid': event.uid });
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
}
