import { Component, OnInit } from '@angular/core';
import { UploadAdapter } from 'src/app/shared/services/app-upload-adapter';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private matDialog:MatDialog
  ) {
    
  }
  
  documentData
  ngOnInit() {
    console.log(this.documentData)
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
  

  openSectionDialog(section, data?) {
    this.buildForm(data);
    let ref = this.matDialog.open(section, {
      data: {
        data,
        mode:data ? FormMode.Edit : FormMode.Create
      },
    });

    ref.afterClosed().subscribe(con => {
      
    });
  }

  sectionForm:FormGroup;
  buildForm(data = {}) {
    this.sectionForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl(null),
      documentId: new FormControl(this.documentData.id, Validators.required),
    });

    this.sectionForm.patchValue(data);
  }


}
