import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { DocumentViewComponent } from './document-view/document-view.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { DocumentCreateComponent } from './document-create/document-create.component';
import { SettingsComponent } from './document-view/settings/settings.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DocumentSectionComponent } from './document-view/settings/document-section/document-section.component';

@NgModule({
  declarations: [
    DocumentsComponent,
    DocumentViewComponent,
    DocumentDetailsComponent,
    DocumentCreateComponent,
    SettingsComponent,
    DocumentSectionComponent
  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    SharedModule,
    MatCardModule,
    MatExpansionModule,
    CKEditorModule
  ]
})
export class DocumentsModule { }
