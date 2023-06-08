import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    MatCheckboxModule
  ]
})
export class AccountModule { }
