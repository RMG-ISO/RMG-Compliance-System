import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthenticationFlowGuard, ResetPasswordComponent } from '@abp/ng.account';
import { ReplaceableRouteContainerComponent } from '@abp/ng.core';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
    // component: ReplaceableRouteContainerComponent,
    // data:{
    //   replaceableComponent: {
    //     key: "Account.LoginComponent" /* Login */,
    //     defaultComponent: LoginComponent,
    //   },
    // }
  },
  {
    path:'forgot-password',
    component:ChangePasswordComponent,
  },
  {
    path:'reset-password',
    component: ReplaceableRouteContainerComponent,
    data:{
      tenantBoxVisible: false,
      replaceableComponent: {
        key: "Account.ResetPasswordComponent" /* ResetPassword */,
        defaultComponent: ResetPasswordComponent,
      },
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
  constructor() {
    console.log('AccountRoutingModule')
  }
}
