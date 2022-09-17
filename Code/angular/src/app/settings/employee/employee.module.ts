import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';


@NgModule({
  declarations: [
    EmployeeComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    MatCardModule
  ]
})
export class EmployeeModule { }
