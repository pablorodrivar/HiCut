import { Component, OnInit } from '@angular/core';
import { Filter } from 'classes/pojo/filter';
import { User } from 'classes/pojo/user';
import { Globals } from '../app.module';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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

  constructor(private router:Router,public toastController: ToastController) { 

  }

  doRegister(){
    var user:User = new User(null,this.email,this.name,this.surname,this.country,this.state,this.city,this.address,this.phone,this.dni);
    Globals.api.doRegister(user,this.password,this.password_confirmation,(ok,msg)=>{
      if (ok!=null){
        this.router.navigate(["/tabs/profile"]);
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
