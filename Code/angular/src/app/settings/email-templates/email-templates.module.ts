import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailTemplatesRoutingModule } from './email-templates-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    EmailTemplatesRoutingModule,
    CKEditorModule,
    SharedModule
  ]
})
export class EmailTemplatesModule { }
