import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { AssessmentComponent } from './assessment.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AssessmentComponent,
  ],
  imports: [
    CommonModule,
    AssessmentRoutingModule,
    SharedModule
  ]
})
export class AssessmentModule { }
