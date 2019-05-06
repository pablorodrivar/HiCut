import { Component } from '@angular/core';
import { Globals } from '../app.module';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class loginPage {
  email: string = "";
  password: string = "";

  constructor(private router:Router,private stor:Storage,public toastController: ToastController){
  }

  processLoginData(){
    Globals.api.doLogin(this.email,this.password,((loged,msg)=>{
      if (loged){
        this.email = "";
        this.password = "";
        this.router.navigate(["/tabs/profile"]);
      }
      else{
        this.presentToast(msg);
      }
    }));
  }

  goToRegister(){
    Globals.api.doLogout();
    this.router.navigate(["/tabs/register"]);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }
}
