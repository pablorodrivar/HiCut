import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Globals } from 'app/globals';
import { User } from '../../classes/pojo/user';
import { ApiController } from 'classes/api.controller';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Input("id") id;
  @Input("name") name;
  @Input("surname") surname;
  @Input("city") city;
  @Input("country") country;
  @Input("address") address;
  @Input("phone") phone;
  @Input("email") email;
  @Input("avatar") avatar;
  public data: any[] = [];
  public url: string;
  public imageResponse: any = [];
  public options: any;
  public image_picked: boolean = false;
  public image: any;

  constructor(public modalController: ModalController, public imagePicker: ImagePicker) {
    this.url = ApiController.api_url;
  }

  ngOnInit() {   
    
  }

  dismiss() {
    this.modalController.dismiss();
  }

  dismissData() {
    let userArr = { id: this.id, name: this.name, surname: this.surname, city: this.city, country: this.country, address: this.address, 
      phone: this.phone, email: this.email, avatar: this.avatar };
    
    let user = User.fromArray(userArr);
    console.log(user)
    Globals.api.setProfile(user, (status, msg) => {
      console.log(status + " " + msg)
    });
    this.data = [{name: this.name, surname: this.surname, city: this.city, country: this.country, address: this.address,
      phone: this.phone, email: this.email, avatar: this.avatar}];
    this.modalController.dismiss(this.data);
  }

  getImage() {
    this.imagePicker.getPictures({
      width: 200,
      quality: 25,
      outputType: 1
    }).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageResponse.push(results[i]);
        this.image_picked = true;
          console.log('Image URI: ' + results[i]);
      }

      this.image = this.imageResponse[0];
      this.avatar = this.image;
    }, (err) => { });
/*
    this.options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      maximumImagesCount: 1,
 
      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 200,
      //height: 200,
 
      // quality of resized image, defaults to 100
      quality: 25,
 
      // output type, defaults to FILE_URIs.
      // available options are 
      // window.imagePicker.OutputType.FILE_URI (0) or 
      // window.imagePicker.OutputType.BASE64_STRING (1)
      outputType: 0
    };

    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageResponse.push(results[i]);
        this.image_picked = true;
      }
      this.image = this.imageResponse[0];
      this.avatar = this.image;
    }, (err) => {
      alert(err);
    });*/
  }
}
