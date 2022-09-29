import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RisksMangementRoutingModule } from './risks-mangement-routing.module';
import { settingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared/shared.module';
import { MatListModule } from '@angular/material/list';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { FirstComponent } from './create/first/first.component';
import { SecondComponent } from './create/second/second.component';
import { ThirdComponent } from './create/third/third.component';
import { FourthComponent } from './create/fourth/fourth.component';
import { FifthComponent } from './create/fifth/fifth.component';


import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { RiskTreatmentModalComponent } from './create/fourth/risk-treatment-modal/risk-treatment-modal.component';
import { MatrixComponent } from './create/matrix/matrix.component';
import { HistoryComponent } from './create/history/history.component';
import { DashboardReportComponent } from './dashboard-report/dashboard-report.component';

@NgModule({
  declarations: [
    settingsComponent,
    ListComponent,
    CreateComponent,
    FirstComponent,
    SecondComponent,
    ThirdComponent,
    FourthComponent,
    FifthComponent,
    RiskTreatmentModalComponent,
    MatrixComponent,
    HistoryComponent,
    DashboardReportComponent,
  ],
  imports: [
    CommonModule,
    RisksMangementRoutingModule,
    SharedModule,
    MatListModule,
    MatRadioModule,
    MatExpansionModule,
    MatMenuModule
  ]
})
export class RisksMangementModule { }
