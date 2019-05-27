import { Component, OnInit } from '@angular/core';
import { Globals } from 'app/globals';
import { ApiController } from 'classes/api.controller';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  public url;

  constructor() {
    this.url = ApiController.api_url;
  }

  ngOnInit() {}

}
