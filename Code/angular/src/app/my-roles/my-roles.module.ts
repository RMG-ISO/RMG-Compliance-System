import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRolesComponent } from './my-roles.component';
import { PermissionManagementModule } from '@abp/ng.permission-management';
import { UiExtensionsModule } from '@abp/ng.theme.shared/extensions';
import { SharedModule } from '../shared/shared.module';
import { NgbCollapseModule,NgbAccordionModule,NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { AddRoleComponent } from './add-role/add-role.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PermissionManagementComponent } from '../permission-management/permission-management.component';



@NgModule({
  declarations: [
    MyRolesComponent,
    AddRoleComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    UiExtensionsModule,
    MatExpansionModule,
    PermissionManagementModule,
    MatChipsModule,
    MatCheckboxModule,
    PermissionManagementComponent
  ],
  exports: [
    MyRolesComponent,
  ]
})
export class MyRolesModule { }
