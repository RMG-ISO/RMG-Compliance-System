import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplianceDepartmentRoutingModule } from './compliance-department-routing.module';
import { ComplianceDepartmentComponent } from './compliance-department.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    ComplianceDepartmentComponent
  ],
  imports: [
    CommonModule,
    ComplianceDepartmentRoutingModule,
    Ng2SmartTableModule,
  ]
})
export class ComplianceDepartmentModule { }
