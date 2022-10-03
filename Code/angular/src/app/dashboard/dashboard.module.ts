import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatChipsModule } from '@angular/material/chips';
import { SharedModule } from '../shared/shared.module';
import { NgxPrintModule } from 'ngx-print';
import { RisksOpportsComponent } from './risks-opports/risks-opports.component';
import { FrameworksComponent } from './frameworks/frameworks.component';


@NgModule({
  declarations: [
    DashboardComponent,
    RisksOpportsComponent,
    FrameworksComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatChipsModule,
    MatCardModule,
    NgxPrintModule
  ]
})
export class DashboardModule { }
