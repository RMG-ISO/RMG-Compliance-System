import { MatCardModule } from '@angular/material/card';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameworkComponent } from './framework.component';
import { FrameworkRoutingModule } from './framework-routing.module';
import { AddFrameworkComponent } from './add-framework/add-framework.component';


@NgModule({
  declarations: [
    FrameworkComponent,
    AddFrameworkComponent
  ],
  entryComponents:[
    AddFrameworkComponent
  ],
  imports: [
    CommonModule,
    FrameworkRoutingModule,
    SharedModule,
    MatCardModule
  ]
})
export class FrameworkModule { }
