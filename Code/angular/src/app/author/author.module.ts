import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorComponent } from './author.component';
import { AuthorDialogComponent } from './components/author-dialog/author-dialog.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AuthorComponent,
    AuthorDialogComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    SharedModule
  ]
})
export class AuthorModule { }
