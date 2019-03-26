import { Component } from '@angular/core';
import { Globals } from '../app.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class loginPage {
  private globals;
  constructor(private router:Router){
    this.globals = Globals;
  }

  goToRegister(){
    this.router.navigate(["/register"]);
  }
}
