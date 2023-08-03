import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { DocumentViewComponent } from './document-view/document-view.component';
// import { DocumentDetailsComponent } from './document-details/document-details.component';
import { DocumentCreateComponent } from './document-create/document-create.component';
import { SettingsComponent } from './document-view/settings/settings.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {NgxPrintModule} from 'ngx-print';
import { RevisionApproveComponent } from './document-view/revision-approve/revision-approve.component';
import { DetailsComponent } from './document-view/details/details.component';
import { PrinciplesComponent } from './document-view/principles/principles.component';
import { AddPrinciplesComponent } from './document-view/principles/add-principles/add-principles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DocumentsComponent,
    DocumentViewComponent,
    // DocumentDetailsComponent,
    DocumentCreateComponent,
    SettingsComponent,
    RevisionApproveComponent,
    DetailsComponent,
    PrinciplesComponent,
    AddPrinciplesComponent,
  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    SharedModule,
    MatCardModule,
    MatExpansionModule,
    CKEditorModule,
    DragDropModule,
    NgxPrintModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DocumentsModule { }
