import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignGuideRoutingModule } from './design-guide-routing.module';
import { DesignGuideComponent } from './design-guide.component';
import { TableFilesComponent } from './table-files/table-files.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DesignGuideComponent,
    TableFilesComponent
  ],
  imports: [
    CommonModule,
    DesignGuideRoutingModule,
    SharedModule
  ]
})
export class DesignGuideModule { }
