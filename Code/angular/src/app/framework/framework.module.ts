import { MatCardModule } from '@angular/material/card';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameworkComponent } from './framework.component';
import { FrameworkRoutingModule } from './framework-routing.module';


@NgModule({
  declarations: [
    FrameworkComponent,
  ], 
  imports: [
    CommonModule,
    FrameworkRoutingModule,
    SharedModule,
  ]
})
export class FrameworkModule { }
