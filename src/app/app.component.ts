import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';

import { ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

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
    private router:Router,
    public toastController: ToastController
  ) {
    let userLang = navigator.language.split('-')[0];
    userLang = /(en|es)/gi.test(userLang) ? userLang : 'en';
    this._translate.use(userLang);
    this.initializeApp();

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
      switch (this.router.url){
        case "/tabs/home":
        case "/tabs/history":
        case "/tabs/profile":
        case "/tabs/login":
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
            break;
          default:
            return;
      }
    });
  }
}
