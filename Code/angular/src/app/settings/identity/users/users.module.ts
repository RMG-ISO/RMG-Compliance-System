import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';
import { PermissionManagementComponent } from 'src/app/permission-management/permission-management.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    PermissionManagementComponent
  ]
})
export class UsersModule { }
