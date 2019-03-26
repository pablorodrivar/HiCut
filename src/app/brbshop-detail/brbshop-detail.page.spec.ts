import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrbshopDetailPage } from './brbshop-detail.page';

describe('BrbshopDetailPage', () => {
  let component: BrbshopDetailPage;
  let fixture: ComponentFixture<BrbshopDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrbshopDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrbshopDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
