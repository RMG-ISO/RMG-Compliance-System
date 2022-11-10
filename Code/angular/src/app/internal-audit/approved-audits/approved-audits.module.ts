import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovedAuditsRoutingModule } from './approved-audits-routing.module';
import { ListComponent } from './list/list.component';
import { AuditItemComponent } from './audit-item/audit-item.component';


@NgModule({
  declarations: [
    ListComponent,
    AuditItemComponent
  ],
  imports: [
    CommonModule,
    ApprovedAuditsRoutingModule,
    SharedModule
  ]
})
export class ApprovedAuditsModule { }
