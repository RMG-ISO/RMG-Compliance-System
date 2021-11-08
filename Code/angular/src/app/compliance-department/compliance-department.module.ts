import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplianceDepartmentRoutingModule } from './compliance-department-routing.module';
import { ComplianceDepartmentComponent } from './compliance-department.component';



@NgModule({
  declarations: [
    ComplianceDepartmentComponent
  ],
  imports: [
    CommonModule,
    ComplianceDepartmentRoutingModule,
  ]
})
export class ComplianceDepartmentModule { }
