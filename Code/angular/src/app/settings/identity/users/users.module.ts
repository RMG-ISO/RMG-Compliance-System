import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';
import { PermissionManagementComponent } from 'src/app/permission-management/permission-management.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './create/create.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    PermissionManagementComponent,
    MatTabsModule,
    MatCheckboxModule,
    MatListModule
  ]
})
export class UsersModule { }
