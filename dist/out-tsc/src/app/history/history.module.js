import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoryPage } from './history.page';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// Configuración de traducción
import { customTranslateLoader } from '../app.module';
var HistoryPageModule = /** @class */ (function () {
    function HistoryPageModule() {
    }
    HistoryPageModule = tslib_1.__decorate([
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
                RouterModule.forChild([{ path: '', component: HistoryPage }])
            ],
            declarations: [HistoryPage]
        })
    ], HistoryPageModule);
    return HistoryPageModule;
}());
export { HistoryPageModule };
//# sourceMappingURL=history.module.js.map