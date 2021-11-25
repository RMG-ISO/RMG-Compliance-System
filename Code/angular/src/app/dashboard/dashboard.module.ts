import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { SharedModule } from 'src/app/shared/shared.module';

import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatChipsModule
  ]
})
export class DashboardModule { }
