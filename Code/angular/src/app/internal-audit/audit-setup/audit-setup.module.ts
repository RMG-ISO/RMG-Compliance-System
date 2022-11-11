import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditSetupRoutingModule } from './audit-setup-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [
    CreateComponent,
  ],
  imports: [
    CommonModule,
    AuditSetupRoutingModule,
    SharedModule,
  ]
})
export class AuditSetupModule { }
