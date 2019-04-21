import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
var TutorialPage = /** @class */ (function () {
    function TutorialPage(storage, router) {
        this.storage = storage;
        this.router = router;
    }
    TutorialPage.prototype.ngOnInit = function () {
    };
    TutorialPage.prototype.finish = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.set('tutorialComplete', true)];
                    case 1:
                        _a.sent();
                        this.router.navigateByUrl('/');
                        return [2 /*return*/];
                }
            });
        });
    };
    TutorialPage = tslib_1.__decorate([
        Component({
            selector: 'app-tutorial',
            templateUrl: './tutorial.page.html',
            styleUrls: ['./tutorial.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router])
    ], TutorialPage);
    return TutorialPage;
}());
export { TutorialPage };
//# sourceMappingURL=tutorial.page.js.map