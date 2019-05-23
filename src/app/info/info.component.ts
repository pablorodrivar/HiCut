import { Component, OnInit } from '@angular/core';
import { Globals } from 'app/globals';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  public url;

  constructor() {
    this.url = Globals.url;
  }

  ngOnInit() {}

}
