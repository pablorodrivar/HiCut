import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'list/:mode', loadChildren: './list/list.module#ListPageModule' },  { path: 'brbshop-detail', loadChildren: './brbshop-detail/brbshop-detail.module#BrbshopDetailPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
