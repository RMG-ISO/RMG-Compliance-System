import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentSubControlRoutingModule } from './assessment-sub-control-routing.module';
import { AssessmentSubControlComponent } from './assessment-sub-control.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AssessmentSubControlComponent,
  ],
  imports: [
    CommonModule,
    AssessmentSubControlRoutingModule,
    SharedModule,
  ]
})
export class AssessmentSubControlModule { }
