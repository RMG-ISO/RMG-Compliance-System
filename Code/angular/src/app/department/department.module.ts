import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentComponent } from './department.component';
import { DepartmentRoutingModule } from './department-routing.module';


@NgModule({
  declarations: [
    DepartmentComponent,
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule,
    MatCardModule
  ]
})
export class DepartmentModule { }
