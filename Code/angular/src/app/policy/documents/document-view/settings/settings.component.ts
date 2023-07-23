import { Component, OnInit } from '@angular/core';
import { UploadAdapter } from 'src/app/shared/services/app-upload-adapter';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentSectionService } from '@proxy/Documents/document-section.service';
import { finalize } from 'rxjs';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private matDialog:MatDialog,
    private documentSectionService:DocumentSectionService,
    private toasterService:ToasterService,
    private confirmation: ConfirmationService,
  ) { }
  
  documentData
  
  form:FormGroup;

  ngOnInit() {
    console.log(this.documentData);
    this.getSections();

    this.form = new FormGroup({
      sections: new FormArray([])
    })
  }

  addSection(data) {
    let group = new FormGroup({
      title: new FormControl(null),
      content: new FormControl(null),
      id: new FormControl(null),
      order: new FormControl(null),
    });
    group.patchValue(data);

    (this.form.controls.sections as FormArray).push(group);
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
  
  sections;
  getSections() {
    this.documentSectionService.getList({documentId: this.documentData.id, maxResultCount:null}).subscribe( r => {
      this.sections = r.items;
      let sections = (this.form.controls.sections as FormArray);
      sections.reset();
      for(let section of this.sections) this.addSection(section);
      console.log(this.sections);
    })
  }

  drop(event: CdkDragDrop<{title: string; poster: string}[]>) {
    moveItemInArray((this.form.controls.sections as FormArray).controls , event.previousIndex, event.currentIndex);
  }
  
  activeIndex;
  openSectionDialog(section, data?, index = null) {
    this.activeIndex = index;
    this.buildForm(data);
    this.matDialog.open(section, {
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

  delete(index) {
    // this.documentSectionService.delete()
    // (this.form.controls.sections as FormArray).removeAt(i);
    let arr = (this.form.controls.sections as FormArray);

    let model = arr.controls[index].value
    this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [ model.title ] }).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.documentSectionService.delete(model.id).subscribe( () => {
          (this.form.controls.sections as FormArray).removeAt(index);
        });
      }
    });

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
      // this.getSections();
      if(this.activeIndex == null) this.addSection(r);
      else {
        (this.form.controls.sections as FormArray).controls[this.activeIndex].patchValue(r);
      }
    })
  }

}
