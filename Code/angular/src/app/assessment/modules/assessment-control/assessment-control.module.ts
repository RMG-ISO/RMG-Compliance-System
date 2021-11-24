// import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentControlRoutingModule } from './assessment-control-routing.module';
import { AssessmentControlComponent } from './assessment-control.component';
import { AssessmentSubDomainComponent } from '../../components/assessment-sub-domain/assessment-sub-domain.component';
import { SharedModule } from 'src/app/shared/shared.module';
// import { AssessmentSubDomainComponent } from '../components/assessment-sub-domain/assessment-sub-domain.component';


@NgModule({
  declarations: [
    AssessmentControlComponent,
    AssessmentSubDomainComponent,

  ],
  imports: [
    CommonModule,
    AssessmentControlRoutingModule,
    SharedModule
  ],
})
export class AssessmentControlModule { }
