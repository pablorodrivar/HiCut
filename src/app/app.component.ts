import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';

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
    public toastController: ToastController
  ) {

    this.initializeApp();
    let userLang = navigator.language.split('-')[0];
    userLang = /(en|es)/gi.test(userLang) ? userLang : 'en';
    this._translate.use(userLang);
  }

  public static lastTimeBackPress:number = new Date().getTime();
  public static timePeriodToExit:number = 2000;

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    var exit_text="";
    this._translate.get('PAGES.APP.EXIT').subscribe(async (res: string) => {
      exit_text=res;
    });
    this.platform.backButton.subscribe(async () => {
      
      if (new Date().getTime() - AppComponent.lastTimeBackPress < AppComponent.timePeriodToExit) {
        navigator['app'].exitApp(); // work for ionic 4
      } else {
        const toast = await this.toastController.create({
          message: exit_text,
          duration: 1000
        });
        toast.present();
        AppComponent.lastTimeBackPress = new Date().getTime();
      }
    });
  }
}
