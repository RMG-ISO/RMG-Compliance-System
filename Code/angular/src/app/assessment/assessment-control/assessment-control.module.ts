import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentControlRoutingModule } from './assessment-control-routing.module';
import { AssessmentControlComponent } from './assessment-control.component';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';


@NgModule({
  declarations: [
    AssessmentControlComponent,
    AssessmentFormComponent
  ],
  imports: [
    CommonModule,
    AssessmentControlRoutingModule,
    SharedModule
  ],
})
export class AssessmentControlModule { }
