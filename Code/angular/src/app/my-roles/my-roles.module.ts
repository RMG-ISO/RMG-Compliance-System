import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRolesComponent } from './my-roles.component';
import { PermissionManagementModule } from '@abp/ng.permission-management';
import { UiExtensionsModule } from '@abp/ng.theme.shared/extensions';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MyRolesComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    UiExtensionsModule, 
    PermissionManagementModule
  ],
  exports: [
    MyRolesComponent
  ]
})
export class MyRolesModule { }
