import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameworksRoutingModule } from './frameworks-routing.module';
import { FrameworksListComponent } from './frameworks-list/frameworks-list.component';
import { SharedModule } from '../shared/shared.module';
import { CreateFrameworkComponent } from './frameworks-list/create-framework/create-framework.component';


@NgModule({
  declarations: [
    FrameworksListComponent,
    CreateFrameworkComponent
  ],
  imports: [
    CommonModule,
    FrameworksRoutingModule,
    SharedModule
  ]
})
export class FrameworksModule { }
