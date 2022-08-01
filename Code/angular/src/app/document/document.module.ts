import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { documentComponent } from './document.component';
import { documentRoutingModule } from './document-routing.module';


@NgModule({
  declarations: [
    documentComponent,
  ],
  imports: [
    CommonModule,
    documentRoutingModule,
    SharedModule,
  ]
})
export class documentModule { }
