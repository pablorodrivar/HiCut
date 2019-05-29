import { Component, OnInit } from '@angular/core';
import { Filter } from 'classes/pojo/filter';
import { User } from 'classes/pojo/user';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Rate } from 'classes/pojo/rate';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  name: string = "";
  surname: string = "";
  country: string = "";
  state: string = "";
  city: string = "";
  address: string = "";
  phone: string = "";
  dni: string = "";
  email: string = "";
  password: string = "";
  password_confirmation: string = "";

  constructor(private router:Router,public toastController: ToastController,public loadingController: LoadingController,public alertController: AlertController,public trans: TranslateService) {

  }

  ionViewWillEnter(){
    this.name = "";
    this.surname = "";
    this.country = "";
    this.state = "";
    this.city = "";
    this.address = "";
    this.phone = "";
    this.dni = "";
    this.email = "";
    this.password = "";
    this.password_confirmation = "";
  }

  async doRegister(){
    var user:User = new User(null,this.email,this.name,this.surname,this.country,this.state,this.city,this.address,this.phone,this.dni);
    var loading = await this.loadingController.create();
    await loading.present();
    Globals.api.doRegister(user,this.password,this.password_confirmation,(ok,msg)=>{
      loading.dismiss();
      if (ok!=null){
        this.router.navigate(["/tabs/login"]);

        this.trans.get('PAGES.REGISTER.DONE').subscribe((res: string) => {
          this.alertController.create({
            message: res,
            buttons: [
              {
                text: 'OK'
              }
            ]
          }).then((alert)=>{
            alert.present();
          });
        });
        return;
      }
      this.presentToast(msg);
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }
}
