import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplianceDepartmentRoutingModule } from './compliance-department-routing.module';
import { ComplianceDepartmentComponent } from './compliance-department.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  declarations: [
    ComplianceDepartmentComponent
  ],
  imports: [
    CommonModule,
    ComplianceDepartmentRoutingModule,
    MatTabsModule,
    NgxDatatableModule,
    SharedModule
  ]
})
export class ComplianceDepartmentModule { }