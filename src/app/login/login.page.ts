import { Component } from '@angular/core';
import { Globals } from '../app.module';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class loginPage {
  constructor(private router:Router,private stor:Storage){
  }

  processLoginData(){
    console.log("login...");
    Globals.api.login("paco","123",(()=>{
      console.log("finished");
    }));
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
