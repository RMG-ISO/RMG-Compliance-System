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
import { MatRadioModule } from '@angular/material/radio';
import { ComplianceFormComponent } from './document-view/principles/compliance-form/compliance-form.component';
import { PrinciplesComplianceDialogComponent } from './document-view/principles/principles-compliance-dialog/principles-compliance-dialog.component';
import { ProgressBarComponent } from '../shared/components/progress-bar/progress-bar.component';

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
    ComplianceFormComponent,
    PrinciplesComplianceDialogComponent,
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
    ReactiveFormsModule,
    MatRadioModule,
    ProgressBarComponent
  ]
})
export class DocumentsModule { }
