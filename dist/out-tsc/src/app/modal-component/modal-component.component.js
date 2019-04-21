import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
var ModalComponent = /** @class */ (function () {
    function ModalComponent(navParams, modalController) {
        this.modalController = modalController;
        this.data = [];
        this.services = [{
                "hair_cut": 0,
                "shaving": 0,
                "beard_trim": 0,
                "hair_dying": 0,
            }];
        // componentProps can also be accessed at construction time using NavParams
        console.log('values', navParams.get('value'));
    }
    ModalComponent.prototype.ngOnInit = function () { };
    ModalComponent.prototype.dismissData = function () {
        this.data = [this.distance, this.services];
        this.modalController.dismiss(this.data);
    };
    ModalComponent.prototype.dismiss = function () {
        this.modalController.dismiss();
    };
    ModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-modal-component',
            templateUrl: './modal-component.component.html',
            styleUrls: ['./modal-component.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavParams, ModalController])
    ], ModalComponent);
    return ModalComponent;
}());
export { ModalComponent };
//# sourceMappingURL=modal-component.component.js.map