import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
var loginPage = /** @class */ (function () {
    function loginPage(router, stor, toastController) {
        this.router = router;
        this.stor = stor;
        this.toastController = toastController;
        this.email = "";
        this.password = "";
    }
    loginPage.prototype.processLoginData = function () {
        var _this = this;
        Globals.api.doLogin(this.email, this.password, (function (loged, msg) {
            if (loged) {
                _this.router.navigate(["/tabs/profile"]);
            }
            else {
                _this.presentToast(msg);
            }
        }));
    };
    loginPage.prototype.goToRegister = function () {
        Globals.api.doLogout();
        this.router.navigate(["/tabs/register"]);
    };
    loginPage.prototype.presentToast = function (msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: msg,
                            duration: 1000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    loginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: 'login.page.html',
            styleUrls: ['login.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Storage, ToastController])
    ], loginPage);
    return loginPage;
}());
export { loginPage };
//# sourceMappingURL=login.page.js.map