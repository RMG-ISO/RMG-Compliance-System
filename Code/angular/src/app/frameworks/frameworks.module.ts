import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameworksRoutingModule } from './frameworks-routing.module';
import { FrameworksListComponent } from './frameworks-list/frameworks-list.component';
import { SharedModule } from '../shared/shared.module';
import { CreateFrameworkComponent } from './frameworks-list/create-framework/create-framework.component';
import { FrameworkViewComponent } from './framework-view/framework-view.component';
import { DomainsComponent } from './domains/domains.component';
import { ControlsComponent } from './controls/controls.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    FrameworksListComponent,
    CreateFrameworkComponent,
    FrameworkViewComponent,
    DomainsComponent,
    ControlsComponent,
  ],
  imports: [
    CommonModule,
    FrameworksRoutingModule,
    SharedModule,
    MatCheckboxModule
  ]
})
export class FrameworksModule { }
