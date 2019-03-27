import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Globals } from '../app.module';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss'],
})
export class AccountSettingsPage implements OnInit {
  private globals;
  public list_id;
  constructor(private route:ActivatedRoute,private router: Router) { 
    this.globals = Globals;
  }

  ngOnInit() {
    this.list_id=this.route.snapshot.paramMap.get('id'); 
  }

  toDetail(detail_id) {
    this.router.navigate(["/tabs/home/list/"+this.list_id+"/detail",detail_id]);
  }
}
