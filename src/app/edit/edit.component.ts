import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Globals } from 'app/globals';
import { User } from '../../classes/pojo/user';

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

  constructor(public modalController: ModalController) { }

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
}
