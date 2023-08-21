import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyUsersComponent } from './users.component';
import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { PermissionManagementModule } from '@abp/ng.permission-management';
import {NgxValidateCoreModule} from '@ngx-validate/core';


import { UiExtensionsModule } from '@abp/ng.theme.shared/extensions';
import { NgbNavModule,NgbCollapseModule,NgbAccordionModule,NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { PermissionManagementComponent } from '../permission-management/permission-management.component';



@NgModule({
  declarations: [
    MyUsersComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ThemeSharedModule,
    SharedModule,
    PermissionManagementModule,
    NgbNavModule,NgbDropdownModule,
    UiExtensionsModule,
    ReactiveFormsModule,NgxValidateCoreModule,
    PermissionManagementComponent
  ]
})
export class UsersModule { }
