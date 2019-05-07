import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
var AccountSettingsPage = /** @class */ (function () {
    function AccountSettingsPage(route, router) {
        this.route = route;
        this.router = router;
        this.globals = Globals;
    }
    AccountSettingsPage.prototype.ngOnInit = function () {
        this.list_id = this.route.snapshot.paramMap.get('id');
    };
    AccountSettingsPage.prototype.toDetail = function (detail_id) {
        this.router.navigate(["/tabs/home/list/" + this.list_id + "/detail", detail_id]);
    };
    AccountSettingsPage.prototype.toEdit = function () {
        this.router.navigate(["/edit-profile"]);
    };
    AccountSettingsPage = tslib_1.__decorate([
        Component({
            selector: 'app-account-settings',
            templateUrl: './account-settings.page.html',
            styleUrls: ['./account-settings.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router])
    ], AccountSettingsPage);
    return AccountSettingsPage;
}());
export { AccountSettingsPage };
//# sourceMappingURL=account-settings.page.js.map