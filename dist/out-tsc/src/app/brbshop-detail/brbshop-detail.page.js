import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
var BrbshopDetailPage = /** @class */ (function () {
    //public events:any;
    function BrbshopDetailPage(datePicker, launchNavigator, route, router, alertController /*, private jsonp: Jsonp*/) {
        this.datePicker = datePicker;
        this.launchNavigator = launchNavigator;
        this.route = route;
        this.router = router;
        this.alertController = alertController;
        this.dateOfevent = new Date().toISOString();
        this.text = "";
        this.options = {
            start: 'Spain, ON'
        };
        this.dayNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",];
        this.slider = [
            {
                image: "assets/imgs/barber1.jpg"
            },
            {
                image: "assets/imgs/barber2.jpg"
            },
            {
                image: "assets/imgs/barber3.jpg"
            }
        ];
    }
    BrbshopDetailPage.prototype.ngOnInit = function () {
        this.list_id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.id = parseInt(this.route.snapshot.paramMap.get('detail_id'));
        console.log("LISTA: " + this.list_id + " BARBERIA: " + this.id);
        /*this.jsonp.request('https://trial.mobiscroll.com/events/?callback=JSONP_CALLBACK').subscribe((res: any) => {
                this.events = res._body;
            });*/
    };
    /*eventSettings: MbscEventcalendarOptions = {
      lang: 'de',
      theme: 'ios',
      display: 'inline',
      view: {
          calendar: { type: 'month' },
          eventList: { type: 'month', scrollable: true }
      }
    };*/
    BrbshopDetailPage.prototype.showLocation = function () {
        this.launchNavigator.navigate('Toronto, ON', this.options)
            .then(function (success) { return console.log('Launched navigator'); }, function (error) { return console.log('Error launching navigator', error); });
    };
    BrbshopDetailPage.prototype.presentAlertPrompt = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Prompt!',
                            inputs: [
                                {
                                    name: 'name1',
                                    type: 'text',
                                    placeholder: 'Placeholder 1'
                                },
                                {
                                    name: 'name2',
                                    type: 'text',
                                    id: 'name2-id',
                                    value: 'hello',
                                    placeholder: 'Placeholder 2'
                                },
                                {
                                    name: 'name3',
                                    value: 'http://ionicframework.com',
                                    type: 'url',
                                    placeholder: 'Favorite site ever'
                                },
                                // input date with min & max
                                {
                                    name: 'name4',
                                    type: 'date',
                                    min: '2017-03-01',
                                    max: '2018-01-12'
                                },
                                // input date without min nor max
                                {
                                    name: 'name5',
                                    type: 'date'
                                },
                                {
                                    name: 'name6',
                                    type: 'number',
                                    min: -5,
                                    max: 10
                                },
                                {
                                    name: 'name7',
                                    type: 'number'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function () {
                                        console.log('Confirm Ok');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BrbshopDetailPage = tslib_1.__decorate([
        Component({
            selector: 'app-brbshop-detail',
            templateUrl: './brbshop-detail.page.html',
            styleUrls: ['./brbshop-detail.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [DatePicker, LaunchNavigator, ActivatedRoute, Router,
            AlertController /*, private jsonp: Jsonp*/])
    ], BrbshopDetailPage);
    return BrbshopDetailPage;
}());
export { BrbshopDetailPage };
//# sourceMappingURL=brbshop-detail.page.js.map