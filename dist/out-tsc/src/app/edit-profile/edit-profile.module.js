import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditProfilePage } from './edit-profile.page';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// Configuración de traducción
import { customTranslateLoader } from '../app.module';
var routes = [
    {
        path: '',
        component: EditProfilePage
    }
];
var EditProfilePageModule = /** @class */ (function () {
    function EditProfilePageModule() {
    }
    EditProfilePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                TranslateModule.forChild({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: customTranslateLoader,
                        deps: [HttpClient]
                    }
                }),
                RouterModule.forChild(routes)
            ],
            declarations: [EditProfilePage]
        })
    ], EditProfilePageModule);
    return EditProfilePageModule;
}());
export { EditProfilePageModule };
//# sourceMappingURL=edit-profile.module.js.map