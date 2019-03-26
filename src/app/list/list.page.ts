import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../app.module';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})

export class ListPage implements OnInit {
  private globals;
  constructor(private router: Router) { 
    this.globals = Globals;
  }

  ngOnInit() {
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  toDetail() {
    this.router.navigate(["/brbshop-detail"]);
  }
}
