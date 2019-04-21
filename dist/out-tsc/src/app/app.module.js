import * as tslib_1 from "tslib";
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
import { IonicStorageModule, Storage } from '@ionic/storage';
export function customTranslateLoader(http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule(stor, http) {
        this.stor = stor;
        this.http = http;
        Globals.http = http;
        Globals.api = new ApiController(stor);
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [AppComponent],
            entryComponents: [],
            imports: [
                MbscModule,
                FormsModule,
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
            providers: [
                DatePicker,
                StatusBar,
                SplashScreen,
                AlertController,
                LaunchNavigator,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
            ],
            bootstrap: [AppComponent]
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, HttpClient])
    ], AppModule);
    return AppModule;
}());
export { AppModule };
var Globals = /** @class */ (function () {
    function Globals() {
    }
    return Globals;
}());
export { Globals };
//# sourceMappingURL=app.module.js.map