import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private globals;
  public list_id;
  public name: string;
  public surname: string;
  public city: string;
  public country: string;
  public address: string;
  public email: string;
  public phone: string;

  constructor(private route:ActivatedRoute,private router: Router, private alertController: AlertController,) {
    this.globals = Globals;
  }

  ngOnInit() {
    this.list_id = this.route.snapshot.paramMap.get('id');
    
    Globals.api.getProfile((profile, msg) => {
      console.log(profile)
      this.name = profile.name;
      this.surname = profile.surname;
      this.city = profile.city;
      this.country = profile.country;
      this.address = profile.address;
      this.phone = profile.phone;
      this.email = profile.email;
    });
  }

  toDetail(detail_id) {
    this.router.navigate(["/tabs/home/list/"+this.list_id+"/detail",detail_id]);
  }

  toEdit() {
    this.router.navigate(["/edit-profile"]);
  }

  logout() {
    Globals.api.doLogout();
    this.router.navigate(["/tabs/login"]);
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesion',
      message: 'Seguro que quiere cerrar sesion?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'SI',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }
}
