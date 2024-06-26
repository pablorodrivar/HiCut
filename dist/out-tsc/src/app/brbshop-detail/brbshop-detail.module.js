import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BrbshopDetailPage } from './brbshop-detail.page';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// Configuración de traducción
import { customTranslateLoader } from '../app.module';
var routes = [
    {
        path: '',
        component: BrbshopDetailPage
    }
];
var BrbshopDetailPageModule = /** @class */ (function () {
    function BrbshopDetailPageModule() {
    }
    BrbshopDetailPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                MbscModule,
                IonicModule,
                HttpModule,
                TranslateModule.forChild({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: customTranslateLoader,
                        deps: [HttpClient]
                    }
                }),
                RouterModule.forChild(routes)
            ],
            declarations: [BrbshopDetailPage]
        })
    ], BrbshopDetailPageModule);
    return BrbshopDetailPageModule;
}());
export { BrbshopDetailPageModule };
//# sourceMappingURL=brbshop-detail.module.js.map