import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ApiController } from '../classes/api.controller';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

import { IonicStorageModule,Storage } from '@ionic/storage';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { AutoCompleteModule } from 'ionic4-auto-complete';
import { BarRatingModule } from "ngx-bar-rating";

import { Globals } from "./globals";
import { PipesModule } from './pipes/pipes.module';

export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ 
    PipesModule,
    MbscModule, 
    FormsModule, 
    BarRatingModule,
    AutoCompleteModule,
    BrowserModule, 
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule, 
    HttpClientModule,
    TranslateModule.forRoot({
         loader: {
            provide: TranslateLoader,
            useFactory: customTranslateLoader,
            deps: [HttpClient]
         }
    })
  ],
  exports: [],
  providers: [
    DatePicker,
    StatusBar,
    SplashScreen,
    AlertController,
    LaunchNavigator,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public stor:Storage,public http:HttpClient){
    Globals.http = http;
    Globals.api = new ApiController(stor);
  }
}

