import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';

import { firebaseConfig } from '../config';
import { LoginPage } from '../pages/login/login';
import { PhysioListPage } from '../pages/physio-list/physio-list';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { HttpClientModule } from '@angular/common/http';
import { CoachListPage } from '../pages/coach-list/coach-list';
import { PlayerAttendencePage } from '../pages/player-attendence/player-attendence';
import { CalendarPage } from '../pages/calendar/calendar';
import { PlayerDetailsPage } from '../pages/player-details/player-details';
import { AttendenceHistoryPage } from '../pages/attendence-history/attendence-history';

import { UserListPage } from '../pages/user-list/user-list';
import { MatchDayPage } from '../pages/match-day/match-day';
import { AboutPage } from '../pages/about/about';

import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    PhysioListPage,
    PlayerAttendencePage,
    CoachListPage,
    CalendarPage,
    PlayerDetailsPage,
    AttendenceHistoryPage,
    MatchDayPage,
    UserListPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    NgCalendarModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    PlayerAttendencePage,
    PhysioListPage,
    CalendarPage,
    CoachListPage,
    PlayerDetailsPage,
    AttendenceHistoryPage,
    MatchDayPage,
    UserListPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    AngularFireDatabase,
    FirebaseProvider
  ]
})
export class AppModule { }
