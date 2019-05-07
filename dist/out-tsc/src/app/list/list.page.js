import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalComponent } from '../modal-component/modal-component.component';
import { ModalController } from '@ionic/angular';
import { Globals } from '../globals';
/*
  PARA VER COMO PASAR DATOS ENTRE MODAL Y LA LISTA: https://ionicframework.com/docs/api/modal
*/
var ListPage = /** @class */ (function () {
    function ListPage(route, router, alertController, modalController) {
        this.route = route;
        this.router = router;
        this.alertController = alertController;
        this.modalController = modalController;
        this.globals = Globals;
    }
    ListPage.prototype.ngOnInit = function () {
        this.list_id = this.route.snapshot.paramMap.get('id');
        console.log(this.list_id);
    };
    ListPage.prototype.doRefresh = function (event) {
        console.log('Begin async operation');
        setTimeout(function () {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    };
    ListPage.prototype.toDetail = function (detail_id) {
        this.router.navigate(["/tabs/home/list/" + this.list_id + "/detail", detail_id]);
    };
    ListPage.prototype.presentModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ModalComponent,
                            componentProps: { value: 123 }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log("dismiss " + data['data']);
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ListPage = tslib_1.__decorate([
        Component({
            selector: 'app-list',
            templateUrl: './list.page.html',
            styleUrls: ['./list.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, AlertController, ModalController])
    ], ListPage);
    return ListPage;
}());
export { ListPage };
//# sourceMappingURL=list.page.js.map