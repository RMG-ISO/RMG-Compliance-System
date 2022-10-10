import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameworkComponent } from './framework.component';
import { FrameworkRoutingModule } from './framework-routing.module';
import { FrameworkReportComponent } from './framework-report/framework-report.component';


@NgModule({
  declarations: [
    FrameworkComponent,
    FrameworkReportComponent,
  ], 
  imports: [
    CommonModule,
    FrameworkRoutingModule,
    SharedModule,
  ]
})
export class FrameworkModule { }
