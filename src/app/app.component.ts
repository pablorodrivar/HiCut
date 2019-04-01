import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { FcmService } from './fcm.service';

import { ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _translate: TranslateService,
    private fcm: FcmService,
    toastCtrl: ToastController
  ) {
    platform.ready().then(() => {
      
      //Get a FCM token
      fcm.getToken()

      //Listen to incoming messages
      fcm.listenToNotifications().pipe(
        tap(msg => {
          //show a toast
          const toast = toastCtrl.create({
            
          });
          toast.finally;
        })
      )
      .subscribe()
    })

    this.initializeApp();
    let userLang = navigator.language.split('-')[0];
    userLang = /(en|es)/gi.test(userLang) ? userLang : 'en';
    this._translate.use(userLang);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
