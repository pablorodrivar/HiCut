import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#homePageModule'
          },
          {
            path: 'list/:id',
            children: [
              {
                path: '',
                loadChildren: '../list/list.module#ListPageModule'
              },
              {
                path: 'detail/:detail_id',
                loadChildren: '../brbshop-detail/brbshop-detail.module#BrbshopDetailPageModule'
              }
            ]
          }
        ]
      },
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: '../login/login.module#loginPageModule'
          },
          {
            path: 'register',
            children: [
              {
                path: '',
                loadChildren: '../register/register.module#RegisterPageModule'
              }
            ]
          },
          {
            path: 'profile',
            children: [
              {
                path: '',
                loadChildren: '../profile/profile.module#ProfilePageModule'
              }
            ]
          }
        ]
      },
      {
        path: 'history',
        children: [
          {
            path: '',
            loadChildren: '../history/history.module#HistoryPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
