import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsMangementRoutingModule } from './documents-mangement-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { DocumentsComponent } from './documents/documents.component';
import { SharedModule } from '../shared/shared.module';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    CategoriesComponent,
    DocumentsComponent
  ],
  imports: [
    CommonModule,
    DocumentsMangementRoutingModule,
    SharedModule,
    MatListModule
  ]
})
export class DocumentsMangementModule { }
