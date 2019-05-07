import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(route, router) {
        this.route = route;
        this.router = router;
        this.globals = Globals;
    }
    ProfilePage.prototype.ngOnInit = function () {
        this.list_id = this.route.snapshot.paramMap.get('id');
    };
    ProfilePage.prototype.toDetail = function (detail_id) {
        this.router.navigate(["/tabs/home/list/" + this.list_id + "/detail", detail_id]);
    };
    ProfilePage.prototype.toEdit = function () {
        this.router.navigate(["/edit-profile"]);
    };
    ProfilePage = tslib_1.__decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.page.html',
            styleUrls: ['./profile.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map