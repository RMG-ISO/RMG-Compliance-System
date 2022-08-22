import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RisksMangementRoutingModule } from './risks-mangement-routing.module';
import { settingsComponent } from './settings/settings.component';
import { riskopportunityComponent } from './riskAndOpportunity/riskopportunity.component';
import { SharedModule } from '../shared/shared.module';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    settingsComponent,
    riskopportunityComponent
  ],
  imports: [
    CommonModule,
    RisksMangementRoutingModule,
    SharedModule,
    MatListModule
  ]
})
export class RisksMangementModule { }
