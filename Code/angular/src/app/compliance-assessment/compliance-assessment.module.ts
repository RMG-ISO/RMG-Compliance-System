import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplianceAssessmentRoutingModule } from './compliance-assessment-routing.module';
import { ListComponent } from './list/list.component';
import { FrameworksSharedModule } from '../frameworks/frameworks-shared.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ComplianceAssessmentRoutingModule,
    FrameworksSharedModule,
    SharedModule
  ]
})
export class ComplianceAssessmentModule { }