import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
var TutorialGuard = /** @class */ (function () {
    function TutorialGuard(storage, router) {
        this.storage = storage;
        this.router = router;
    }
    TutorialGuard.prototype.canActivate = function (next, state) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var isComplete;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get('tutorialComplete')];
                    case 1:
                        isComplete = _a.sent();
                        if (!isComplete) {
                            this.router.navigateByUrl('/tutorial');
                        }
                        return [2 /*return*/, isComplete];
                }
            });
        });
    };
    TutorialGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router])
    ], TutorialGuard);
    return TutorialGuard;
}());
export { TutorialGuard };
//# sourceMappingURL=tutorial.guard.js.map