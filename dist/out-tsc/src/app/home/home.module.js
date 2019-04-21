import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { homePage } from './home.page';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// Configuración de traducción
import { customTranslateLoader } from '../app.module';
var homePageModule = /** @class */ (function () {
    function homePageModule() {
    }
    homePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                TranslateModule.forChild({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: customTranslateLoader,
                        deps: [HttpClient]
                    }
                }),
                RouterModule.forChild([{ path: '', component: homePage }])
            ],
            declarations: [homePage]
        })
    ], homePageModule);
    return homePageModule;
}());
export { homePageModule };
//# sourceMappingURL=home.module.js.map