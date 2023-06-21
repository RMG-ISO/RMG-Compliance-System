import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from '../shared/shared.module';
import { ComplianceFormComponent } from './compliance-form/compliance-form.component';
import { ControlViewComponent } from './control-view/control-view.component';
import { CreateControlComponent } from './domain-view/create-control/create-control.component';
import { DomainViewComponent } from './domain-view/domain-view.component';
import { ExpansionSubControlsTableComponent } from './domain-view/expansion-sub-controls-table/expansion-sub-controls-table.component';
import { CreateDomainComponent } from './framework-view/create-domain/create-domain.component';
import { ExpansionSubDomainsTableComponent } from './framework-view/expansion-sub-domains-table/expansion-sub-domains-table.component';
import { FrameworkViewComponent } from './framework-view/framework-view.component';
import { CreateFrameworkComponent } from './frameworks-list/create-framework/create-framework.component';
import { FrameworksRoutingModule } from './frameworks-routing.module';
import { ChangeLogComponent } from './framework-view/change-log/change-log.component';
import { NgxEchartsModule } from 'ngx-echarts';



@NgModule({
  declarations: [
    CreateFrameworkComponent,
    FrameworkViewComponent,
    ExpansionSubDomainsTableComponent,
    CreateDomainComponent,
    DomainViewComponent,
    CreateControlComponent,
    ExpansionSubControlsTableComponent,
    ComplianceFormComponent,
    ControlViewComponent,
    ChangeLogComponent
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
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports:[
    CreateFrameworkComponent,
    FrameworkViewComponent,
    ExpansionSubDomainsTableComponent,
    CreateDomainComponent,
    DomainViewComponent,
    CreateControlComponent,
    ExpansionSubControlsTableComponent,
    ComplianceFormComponent,
    ControlViewComponent,
    ChangeLogComponent
  ]
})
export class FrameworksSharedModule { }
