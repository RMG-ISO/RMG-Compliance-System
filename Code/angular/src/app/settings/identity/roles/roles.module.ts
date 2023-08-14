import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { PermissionManagementComponent } from 'src/app/permission-management/permission-management.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { PermissionsManagementComponent } from '../permissions-management/permissions-management.component';


@NgModule({
  declarations: [
    RolesComponent,
    AddRoleComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule,
    MatChipsModule,
    MatCheckboxModule,
    // PermissionManagementComponent,

    PermissionsManagementComponent
    
  ]
})
export class RolesModule { }
