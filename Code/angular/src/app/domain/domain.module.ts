import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomainComponent } from './domain.component';
import { DomainRoutingModule } from './domain-routing.module';


@NgModule({
  declarations: [
    DomainComponent,
  ],
  imports: [
    CommonModule,
    DomainRoutingModule,
    SharedModule,
    MatCardModule
  ]
})
export class DomainModule { }
