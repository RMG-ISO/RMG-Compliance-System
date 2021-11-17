import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomainRoutingModule } from './domain-routing.module';
import { DomainComponent } from './domain.component';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';


@NgModule({
  declarations: [
    DomainComponent,
    AssessmentFormComponent
  ],
  imports: [
    CommonModule,
    DomainRoutingModule,
    SharedModule
  ],
})
export class DomainModule { }
