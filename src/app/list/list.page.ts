import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Globals } from '../app.module';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})

export class ListPage implements OnInit {
  private globals;
  public list_id;
  type:number = 2;
  constructor(private route:ActivatedRoute,private router: Router) { 
    this.globals = Globals;
  }

  ngOnInit() {
    this.list_id=this.route.snapshot.paramMap.get('id');
    console.log(this.list_id);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  toDetail(detail_id) {
    this.router.navigate(["/tabs/home/list/"+this.list_id+"/detail",detail_id]);
  }
}
