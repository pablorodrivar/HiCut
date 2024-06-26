import { Component } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController } from '@ionic/angular';
import { Comment } from 'classes/pojo/comment';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class loginPage {
  email: string = "";
  password: string = "";
  doingLogin=false;

  constructor(private router:Router,private stor:Storage,public toastController: ToastController,public loadingController: LoadingController){
  }

  ionViewWillEnter(){
    console.log(this.router.url);
    
    this.email = "";
    this.password = "";
  }

  async processLoginData(){
    if (!this.doingLogin){
      this.doingLogin=true;
      var loading = await this.loadingController.create();
      await loading.present();
      Globals.api.doLogin(this.email,this.password,((loged,msg)=>{
        this.doingLogin=false;
        loading.dismiss();
        if (loged===true){
          this.email = "";
          this.password = "";
          this.router.navigate(["/tabs/profile"]);
        }
        else{
          this.presentToast(msg);
        }
      }));
    }
  }

  goToRegister(){
    Globals.api.doLogout();
    this.router.navigate(["/tabs/register"]);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
