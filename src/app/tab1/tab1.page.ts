import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(
    private router: Router
  ){}

  pushListMen(){
    console.log("xxxxxxxxx");
    this.router.navigate(["/list",0]);
  }

  pushListWoman(){
    this.router.navigate(["/list",1]);
  }

  pushListEveryOne(){
    this.router.navigate(["/list",2]);
  }
}
