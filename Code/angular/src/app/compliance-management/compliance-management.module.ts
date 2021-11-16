import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplianceManagementRoutingModule } from './compliance-management-routing.module';
import { ComplianceManagementComponent } from './compliance-management.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ComplianceManagementComponent
  ],
  imports: [
    CommonModule,
    ComplianceManagementRoutingModule,
    SharedModule
  ]
})
export class ComplianceManagementModule { }
