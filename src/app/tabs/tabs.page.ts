import { Component, ViewChild, ElementRef } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public globals;
  constructor(){
    this.globals=Globals;
  }
}
