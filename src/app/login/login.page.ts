import { Component } from '@angular/core';
import { Globals } from '../app.module';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class loginPage {
  private globals;
  constructor(){
    this.globals = Globals;
  }

  modGlobal(){
    this.globals.isLoged=!this.globals.isLoged;
    console.log(this.globals.isLoged)
  }
}
