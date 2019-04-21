import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../app.module';
var homePage = /** @class */ (function () {
    function homePage(router) {
        this.router = router;
        this.globals = Globals;
    }
    homePage.prototype.pushListMen = function () {
        /*if (this.globals.api.isLoged()){
          console.log("loged");
        }
        else{
          console.log("not loged");
        }*/
        this.router.navigate(["/tabs/home/list", 1]);
    };
    homePage.prototype.pushListWoman = function () {
        this.router.navigate(["/tabs/home/list", 2]);
    };
    homePage.prototype.pushListEveryOne = function () {
        this.router.navigate(["/tabs/home/list", 3]);
    };
    homePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], homePage);
    return homePage;
}());
export { homePage };
//# sourceMappingURL=home.page.js.map