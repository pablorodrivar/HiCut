import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  template: `
  <div
    class="search-results"
    infiniteScroll
    [infiniteScrollDistance]="2"
    [infiniteScrollThrottle]="50"
    (scrolled)="onScroll()"
  ></div>
`
})
export class InfiniteScrollComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  onScroll() {
    console.log("scrolled!!")
  }

}
