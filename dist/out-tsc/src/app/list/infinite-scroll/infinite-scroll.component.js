import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var InfiniteScrollComponent = /** @class */ (function () {
    function InfiniteScrollComponent() {
    }
    InfiniteScrollComponent.prototype.ngOnInit = function () { };
    InfiniteScrollComponent.prototype.onScroll = function () {
        console.log("scrolled!!");
    };
    InfiniteScrollComponent = tslib_1.__decorate([
        Component({
            selector: 'app-infinite-scroll',
            templateUrl: './infinite-scroll.component.html',
            styleUrls: ['./infinite-scroll.component.scss'],
            template: "\n  <div\n    class=\"search-results\"\n    infiniteScroll\n    [infiniteScrollDistance]=\"2\"\n    [infiniteScrollThrottle]=\"50\"\n    (scrolled)=\"onScroll()\"\n  ></div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], InfiniteScrollComponent);
    return InfiniteScrollComponent;
}());
export { InfiniteScrollComponent };
//# sourceMappingURL=infinite-scroll.component.js.map