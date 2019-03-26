import { Component } from '@angular/core';
import { Globals } from '../app.module';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  private globals;
  constructor(){
    this.globals = Globals;
  }
  checkIsLoged() : boolean{
    return this.globals.api.isLoged();
  }
}
