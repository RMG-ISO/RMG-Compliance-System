import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesManagementRoutingModule } from './files-management-routing.module';
import { FilesManagementComponent } from './files-management.component';
import { SharedModule } from '../shared/shared.module';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    FilesManagementComponent
  ],
  imports: [
    CommonModule,
    FilesManagementRoutingModule,
    SharedModule,
    MatListModule
  ]
})
export class FilesManagementModule { }
