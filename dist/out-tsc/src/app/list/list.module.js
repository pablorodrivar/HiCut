import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MbscModule } from '@mobiscroll/angular';
import { ModalComponent } from '../modal-component/modal-component.component';
import { IonicModule } from '@ionic/angular';
import { ListPage } from './list.page';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// Configuración de traducción
import { customTranslateLoader } from '../app.module';
var routes = [
    {
        path: '',
        component: ListPage
    }
];
var ListPageModule = /** @class */ (function () {
    function ListPageModule() {
    }
    ListPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                MbscModule,
                IonicModule,
                TranslateModule.forChild({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: customTranslateLoader,
                        deps: [HttpClient]
                    }
                }),
                RouterModule.forChild(routes),
                InfiniteScrollModule
            ],
            declarations: [ListPage, ModalComponent],
            entryComponents: [ModalComponent]
        })
    ], ListPageModule);
    return ListPageModule;
}());
export { ListPageModule };
//# sourceMappingURL=list.module.js.map