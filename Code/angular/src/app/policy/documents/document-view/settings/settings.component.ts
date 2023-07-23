import { Component, OnInit } from '@angular/core';
import { UploadAdapter } from 'src/app/shared/services/app-upload-adapter';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentSectionService } from '@proxy/Documents/document-section.service';
import { finalize } from 'rxjs';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private matDialog:MatDialog,
    private documentSectionService:DocumentSectionService,
    private toasterService:ToasterService
  ) { }
  
  documentData
  ngOnInit() {
    console.log(this.documentData);
    this.getSections();
  }


  ckeConfig = {
    language: {
      ui: 'ar',
      content: 'ar',
    },
  };
  public Editor = DecoupledEditor;

  public onReady(editor) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
    editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      return new UploadAdapter(loader);
    };
  }
  
  getSections() {
    this.documentSectionService.getList({documentId: this.documentData.id, maxResultCount:null}).subscribe( r => {
      console.log(r);

    })
  }

  openSectionDialog(section, data?) {
    this.buildForm(data);
    let ref = this.matDialog.open(section, {
      data: {
        data,
        mode:data ? FormMode.Edit : FormMode.Create
      },
    });
  }

  sectionForm:FormGroup;
  buildForm(data = {}) {
    this.sectionForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl('content'),
      documentId: new FormControl(this.documentData.id, Validators.required),
      id: new FormControl(null)
    });

    this.sectionForm.patchValue(data);
  }


  isSaving = false;
  save(ref) {
    if(this.sectionForm.invalid) return;
    this.isSaving = true;

    let value = this.sectionForm.value;
    (value.id ? this.documentSectionService.update(value.id, value) : this.documentSectionService.create(value))
    .pipe(finalize(() => this.isSaving = false))
    .subscribe(r => {
      this.toasterService.success( value.id ? '::UpdatedSuccessfully' : '::CreatedSuccessfully' , "");
      ref.close(true);
      this.getSections();
    })
  }

}
