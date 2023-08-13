import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DepartmentComponent } from './department.component';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    DepartmentComponent,
    CreateComponent,
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule,
    MatCardModule
  ]
})
export class DepartmentModule { }
