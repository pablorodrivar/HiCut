import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../app.module';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private globals;
  constructor(private router: Router){
    this.globals = Globals;
  }

  pushListMen(){
    if (this.globals.api.isLoged()){
      console.log("loged");
    }
    else{
      console.log("not loged");
    }
    this.router.navigate(["/list",0]);
  }

  pushListWoman(){
    this.router.navigate(["/list",1]);
  }

  pushListEveryOne(){
    this.router.navigate(["/list",2]);
  }
}
