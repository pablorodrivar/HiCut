import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BrbshopDetailPage } from './brbshop-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BrbshopDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BrbshopDetailPage]
})
export class BrbshopDetailPageModule {}
