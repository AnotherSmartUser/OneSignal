import { Component } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private storage: Storage,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setupPush();
      this.set();
    });

  }

  setupPush() {
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit('bea935ac-4c54-43f8-b344-eaabbc163488', '1068412232729');

    this.oneSignal.endInit();
  }

  set() {
    this.storage.get('first_time').then((val) => {
      if (val !== null) {
        console.log('app isnt for the first time started');
      } else {
        console.log('probably the first time');
        this.storage.set('first_time', 'done');
        this.presentAlertConfirm();
      }
    });
  }

  notifcations() {
    if (localStorage.getItem('notifications') === 'disable') {
      this.oneSignal.setSubscription(false);
    }
    else
    {
      this.oneSignal.setSubscription(true);
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'No',
          role: 'No',
          cssClass: 'secondary',
          handler: (blah) => {
            localStorage.setItem('notifications', 'disable');
            this.notifcations();
          }
        }, {
          text: 'Si',
          handler: () => {
            localStorage.setItem('notifications', 'enable');
            this.notifcations();
          }
        }
      ]
    });

    await alert.present();
  }


}
