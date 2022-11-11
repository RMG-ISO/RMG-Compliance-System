import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovedAuditsRoutingModule } from './approved-audits-routing.module';
import { AuditItemComponent } from './audit-item/audit-item.component';


@NgModule({
  declarations: [
    AuditItemComponent
  ],
  imports: [
    CommonModule,
    ApprovedAuditsRoutingModule,
    SharedModule,
    MatRadioModule
  ]
})
export class ApprovedAuditsModule { }
