import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { CreateComponent } from './create/create.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    EmployeeComponent,
    CreateComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    MatCardModule,
    MatCheckboxModule
  ]
})
export class EmployeeModule { }
