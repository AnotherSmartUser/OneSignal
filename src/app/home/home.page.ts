import { Component } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private oneSignal: OneSignal) {}

  ionViewWillEnter() {
    this.OneS();
  }

  event(e) {
    console.log(e.detail.value);
    localStorage.setItem('notifications', e.detail.value);
    this.OneS();
  }

  OneS() {
    if(localStorage.getItem('notifications') === 'disable') {
      this.oneSignal.setSubscription(false);
    } else {
      this.oneSignal.setSubscription(true);
    }

  }

}
