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
    Globals.api.login("paco","123",(()=>{
      this.router.navigate(["/tabs/profile"]);
    }));
  }

  goToRegister(){
    Globals.api.logout();
    this.router.navigate(["/tabs/register"]);
  }
}
