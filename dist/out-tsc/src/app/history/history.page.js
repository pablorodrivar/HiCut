import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var HistoryPage = /** @class */ (function () {
    function HistoryPage(router) {
        this.router = router;
    }
    HistoryPage.prototype.goToHistoryDetail = function (event, item) {
        this.router.navigate(["/tabs/history/history_detail/1"]);
    };
    HistoryPage = tslib_1.__decorate([
        Component({
            selector: 'app-history',
            templateUrl: 'history.page.html',
            styleUrls: ['history.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], HistoryPage);
    return HistoryPage;
}());
export { HistoryPage };
//# sourceMappingURL=history.page.js.map