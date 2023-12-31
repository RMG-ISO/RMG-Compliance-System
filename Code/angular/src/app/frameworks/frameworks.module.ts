import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameworksRoutingModule } from './frameworks-routing.module';
import { FrameworksListComponent } from './frameworks-list/frameworks-list.component';
import { SharedModule } from '../shared/shared.module';
import { CreateFrameworkComponent } from './frameworks-list/create-framework/create-framework.component';
import { FrameworkViewComponent } from './framework-view/framework-view.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { ExpansionSubDomainsTableComponent } from './framework-view/expansion-sub-domains-table/expansion-sub-domains-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateDomainComponent } from './framework-view/main-domains-view/create-domain/create-domain.component';
import { DomainViewComponent } from './domain-view/domain-view.component';
import { CreateControlComponent } from './domain-view/create-control/create-control.component';
import { ExpansionSubControlsTableComponent } from './domain-view/expansion-sub-controls-table/expansion-sub-controls-table.component';
import { ComplianceFormComponent } from './compliance-form/compliance-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { ControlViewComponent } from './control-view/control-view.component';
import { FrameworksSharedModule } from './frameworks-shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    FrameworksListComponent,
    // CreateFrameworkComponent,
    // FrameworkViewComponent,
    // ExpansionSubDomainsTableComponent,
    // CreateDomainComponent,
    // DomainViewComponent,
    // CreateControlComponent,
    // ExpansionSubControlsTableComponent,
    // ComplianceFormComponent,
    // ControlViewComponent,
  ],
  imports: [
    CommonModule,
    FrameworksRoutingModule,
    SharedModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    FrameworksSharedModule,
    MatTooltipModule
  
  ]
})
export class FrameworksModule { }
