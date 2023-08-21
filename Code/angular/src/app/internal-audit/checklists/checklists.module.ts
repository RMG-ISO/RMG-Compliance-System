import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChecklistsRoutingModule } from './checklists-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    ChecklistsRoutingModule,
    SharedModule
  ]
})
export class ChecklistsModule { }
