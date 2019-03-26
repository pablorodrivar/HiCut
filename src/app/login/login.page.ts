import { Component } from '@angular/core';
import { Globals } from '../app.module';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { store } from '@angular/core/src/render3';
@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class loginPage {
  private globals;
  constructor(private router:Router,private stor:Storage){
    this.globals = Globals;
  }

  processLoginData(){
    console.log("login...");
    this.stor.set("user","something").then((data)=>{
      this.router.navigate(["/tabs/login/profile"]);
    },(error)=>{
      console.log(error);
    })
  }

  goToRegister(){
    this.router.navigate(["/tabs/login/register"]);
  }
}
