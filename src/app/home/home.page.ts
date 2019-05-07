import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../app.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class homePage {
  private globals;
  constructor(private router: Router){
    this.globals = Globals;
  }

  pushListMen(){
    /*if (this.globals.api.isLoged()){
      console.log("loged");
    }
    else{
      console.log("not loged");
    }*/
    this.router.navigate(["/tabs/home/list",1]);
  }

  pushListWoman(){
    this.router.navigate(["/tabs/home/list",2]);
  }

  pushListEveryOne(){
    this.router.navigate(["/tabs/home/list",0]);
  }
}
