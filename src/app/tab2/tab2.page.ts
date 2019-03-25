import { Component } from '@angular/core';
import { Globals } from '../app.module';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  private globals;
  constructor(){
    this.globals = Globals;
  }

  modGlobal(){
    this.globals.isLoged=!this.globals.isLoged;
    console.log(this.globals.isLoged)
  }
}
