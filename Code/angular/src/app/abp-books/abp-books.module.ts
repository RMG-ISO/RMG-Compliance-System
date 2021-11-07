import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbpBooksRoutingModule } from './abp-books-routing.module';
import { AbpBooksComponent } from './abp-books.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AbpBooksComponent
  ],
  imports: [
    CommonModule,
    AbpBooksRoutingModule,
    NgxDatatableModule,
    SharedModule,
    NgbDatepickerModule,
  ]
})
export class AbpBooksModule { }
