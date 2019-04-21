import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { TutorialGuard } from './guards/tutorial.guard';
var routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'list/:mode', loadChildren: './list/list.module#ListPageModule' },
    { path: 'brbshop-detail', loadChildren: './brbshop-detail/brbshop-detail.module#BrbshopDetailPageModule' },
    { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
    { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
    { path: 'account-settings', loadChildren: './account-settings/account-settings.module#AccountSettingsPageModule' },
    { path: 'edit-profile', loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule' },
    {
        path: '',
        loadChildren: './tabs/tabs.module#TabsPageModule',
        canActivate: [TutorialGuard] // <-- apply here 
    },
    {
        path: 'tutorial',
        loadChildren: './tutorial/tutorial.module#TutorialPageModule'
    },
    { path: 'history-detail', loadChildren: './history-detail/history-detail.module#HistoryDetailPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map