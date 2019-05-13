import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Input("name") name;
  @Input("surname") surname;
  @Input("city") city;
  @Input("country") country;
  @Input("address") address;
  @Input("phone") phone;
  @Input("email") email;
  public data: any[] = [];

  constructor(public modalController: ModalController) { }

  ngOnInit() {   
    
  }

  dismiss() {
    this.modalController.dismiss();
  }

  dismissData() {
    this.data = [{name: this.name, surname: this.surname, city: this.city, country: this.country, address: this.address,
      phone: this.phone, email: this.email}];
    this.modalController.dismiss(this.data);
  }
}
