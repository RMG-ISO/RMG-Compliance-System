import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlComponent } from './control.component';
import { ControlRoutingModule } from './control-routing.module';


@NgModule({
  declarations: [
    ControlComponent,
  ],
  imports: [
    CommonModule,
    ControlRoutingModule,
    SharedModule,
    MatCardModule
  ]
})
export class ControlModule { }
