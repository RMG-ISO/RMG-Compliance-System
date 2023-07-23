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
  sectionsFormArr:FormArray;
  ngOnInit() {
    console.log(this.documentData);
    this.getSections();

    this.form = new FormGroup({
      sections: new FormArray([])
    });

    this.sectionsFormArr = (this.form.controls.sections as FormArray);
  }

  addSection(data) {
    let group = new FormGroup({
      title: new FormControl(null),
      content: new FormControl(null),
      id: new FormControl(null),
      order: new FormControl(null),
      documentId: new FormControl(null),
    });
    group.patchValue(data || {documentId: this.documentData.id});

    this.sectionsFormArr.push(group);


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
  
  sections = [];;
  getSections() {
    this.documentSectionService.getList({documentId: this.documentData.id, maxResultCount:null}).subscribe( r => {
      this.sections = r.items.sort( (a,b) => {
        if(a.order > b.order) return 1;
        if(a.order < b.order) return -1;
        return 0;
      });
      // let sections = this.sectionsFormArr;
      this.sectionsFormArr.reset();
      for(let section of this.sections) this.addSection(section);
      console.log(this.sections);
    })
  }

  drop(event: CdkDragDrop<{title: string; poster: string}[]>) {
    moveItemInArray(this.sectionsFormArr.controls , event.previousIndex, event.currentIndex);
    
    this.updateOrders();
  }

  updateOrders() {
    this.documentSectionService.changeOrdersByIdAndSections(this.documentData.id, this.sectionsFormArr.getRawValue().map(g => g.id)).subscribe();
    this.sections = this.sectionsFormArr.getRawValue();
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
    // let arr = (this.form.controls.sections as FormArray);

    let model = this.sectionsFormArr.controls[index].value
    this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [ model.title ] }).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.documentSectionService.delete(model.id).subscribe( () => {
          (this.form.controls.sections as FormArray).removeAt(index);
          this.sections = this.sectionsFormArr.getRawValue();
        });
      }
    });
  }

  updatedIndex = null;
  updateContent() {
    console.log('updatedIndex', this.updatedIndex);
    let updateGroup = this.sectionsFormArr.controls[this.updatedIndex];
    if(updateGroup.invalid) return;

    this.documentSectionService.update(updateGroup.value.id, updateGroup.value).subscribe(r => {
      this.sections[this.updatedIndex] = r;
    });
  }

  resetSection(index) {
    let group = this.sectionsFormArr.controls[index] as FormGroup;
    group.controls.content.setValue(this.sections[index].content);
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

      this.updateOrders();
    })
  }

}
