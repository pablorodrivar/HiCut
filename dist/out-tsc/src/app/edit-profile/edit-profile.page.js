import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
var EditProfilePage = /** @class */ (function () {
    function EditProfilePage(imagePicker) {
        this.imagePicker = imagePicker;
        this.options = {
            // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
            // selection of a single image, the plugin will return it.
            maximumImagesCount: 1,
            // max width and height to allow the images to be.  Will keep aspect
            // ratio no matter what.  So if both are 800, the returned image
            // will be at most 800 pixels wide and 800 pixels tall.  If the width is
            // 800 and height 0 the image will be 800 pixels wide if the source
            // is at least that wide.
            width: 800,
            height: 800,
            // quality of resized image, defaults to 100
            quality: 100
        };
    }
    EditProfilePage.prototype.ngOnInit = function () {
    };
    EditProfilePage.prototype.pickImage = function () {
        this.imagePicker.getPictures(this.options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
            }
        }, function (err) { });
    };
    EditProfilePage = tslib_1.__decorate([
        Component({
            selector: 'app-edit-profile',
            templateUrl: './edit-profile.page.html',
            styleUrls: ['./edit-profile.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ImagePicker])
    ], EditProfilePage);
    return EditProfilePage;
}());
export { EditProfilePage };
//# sourceMappingURL=edit-profile.page.js.map