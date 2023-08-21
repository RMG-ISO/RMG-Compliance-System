import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadAdapter } from 'src/app/shared/services/app-upload-adapter';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentSectionService, DocumentStatus } from '@proxy/documents';
import { finalize } from 'rxjs';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @ViewChild('allPages') allPages:CKEditorComponent;


  constructor(
    private matDialog:MatDialog,
    private documentSectionService:DocumentSectionService,
    private toasterService:ToasterService,
    private confirmation: ConfirmationService,
  ) { }
  
  documentData

  DocumentStatus = DocumentStatus;
  
  form:FormGroup;
  sectionsFormArr:FormArray;
  // ExportPdf = ExportPdf;
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

  public onReady(editor, isAllPages = false) {
    editor.ui
    .getEditableElement()
    .parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
    editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      return new UploadAdapter(loader);
    };

    if(isAllPages) {
      console.log(this.allPages['editorElement'])
      this.allPages['editorElement'].setAttribute('id', 'print-content-section')
    }
  }

  // PDFEditor = PDFEditor;
  
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
      for(let section of this.sections) {
        this.addSection(section);
        this.allContents += `<h2>${section.title}</h2>` + section.content;
      }
      console.log(this.sections);
    })
  }

  drop(event: CdkDragDrop<{title: string; poster: string}[]>) {
    moveItemInArray(this.sectionsFormArr.controls , event.previousIndex, event.currentIndex);
    
    this.updateOrders();
  }

  allContents = '';
  updateOrders() {
    this.documentSectionService.changeOrdersByIdAndSections(this.documentData.id, this.sectionsFormArr.getRawValue().map(g => g.id)).subscribe();
    this.sections = this.sectionsFormArr.getRawValue();


    this.allContents = '';
    for(let section of this.sections) {
      this.allContents += `<h2>${section.title}</h2>` + section.content;
    }
  }

  print(button) {
    let style;
    if(document.body.dir === 'rtl' ) {
      style = document.createElement('style');
      style.innerHTML = `*{direction:rtl; text-align:right}` ;
      document.head.appendChild(style);
    }
    button.click();
  }

  // async exportDoc() {
  //   await htmlToDocx(document.getElementById('print-section').outerHTML)
  // }

  exportDoc() {
    // <head>
    // <meta charset="UTF-8">
    // <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    // <meta http-equiv="Pragma" content="no-cache" />
    // <meta http-equiv="Expires" content="0" />
    // <title>testTitle</title>
    // </head>
    const HtmlStr = `
      <!DOCTYPE html>
      <html lang="${document.body.dir === 'rtl' ? 'ar' : 'en'}" >
     

        ${document.head.outerHTML}
      <body dir="lang="${document.body.dir === 'rtl' ? 'rtl' : 'ltr'}"">
          ${document.getElementById('print-section').outerHTML}
      </body >
      </html >`;
    const option = { orientation: 'portrait', margins: {} }
    const headerConfig = {
      leftStr: 'headerLeft',
      centerStr: 'headerCenter',
      rightStr: 'headerRight',
    }
    const footerConfig = {
      leftStr: 'footerLeft',
      centerStr: 'footerCenter',
      rightStr: 'footerRight',
    }
    asBlob(HtmlStr, option as any).then(blobData => {
      console.log('blobData', blobData)
      saveAs(blobData, `testDocument.docx`) // save as docx document
    })
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
    let updateGroup = this.sectionsFormArr.controls[this.updatedIndex];
    if(updateGroup.invalid) return;

    this.documentSectionService.update(updateGroup.value.id, updateGroup.value).subscribe(r => {
      this.sections[this.updatedIndex] = r;
      this.toasterService.success('::SavedSuccessfully');
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

let parsedText =  `
<h2>Bilingual Personality Disorder</h2>
<figure class="image image-style-side"><img src="https://c.cksource.com/a/1/img/docs/sample-image-bilingual-personality-disorder.jpg">
  <figcaption>One language, one person.</figcaption>
</figure>
<p>
  This may be the first time you hear about this made-up disorder but
  it actually isn’t so far from the truth. Even the studies that were conducted almost half a century show that
  <strong>the language you speak has more effects on you than you realise</strong>.
</p>
<p>
  One of the very first experiments conducted on this topic dates back to 1964.
  <a href="https://www.researchgate.net/publication/9440038_Language_and_TAT_content_in_bilinguals">In the experiment</a>
  designed by linguist Ervin-Tripp who is an authority expert in psycholinguistic and sociolinguistic studies,
  adults who are bilingual in English in French were showed series of pictures and were asked to create 3-minute stories.
  In the end participants emphasized drastically different dynamics for stories in English and French.
</p>
<p>
  Another ground-breaking experiment which included bilingual Japanese women married to American men in San Francisco were
  asked to complete sentences. The goal of the experiment was to investigate whether or not human feelings and thoughts
  are expressed differently in <strong>different language mindsets</strong>.
  Here is a sample from the the experiment:
</p>
<table>
  <thead>
    <tr>
      <th></th>
      <th>English</th>
      <th>Japanese</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Real friends should</td>
      <td>Be very frank</td>
      <td>Help each other</td>
    </tr>
    <tr>
      <td>I will probably become</td>
      <td>A teacher</td>
      <td>A housewife</td>
    </tr>
    <tr>
      <td>When there is a conflict with family</td>
      <td>I do what I want</td>
      <td>It's a time of great unhappiness</td>
    </tr>
  </tbody>
</table>
<p>
  More recent <a href="https://books.google.pl/books?id=1LMhWGHGkRUC">studies</a> show, the language a person speaks affects
  their cognition, behaviour, emotions and hence <strong>their personality</strong>.
  This shouldn’t come as a surprise
  <a href="https://en.wikipedia.org/wiki/Lateralization_of_brain_function">since we already know</a> that different regions
  of the brain become more active depending on the person’s activity at hand. Since structure, information and especially
  <strong>the culture</strong> of languages varies substantially and the language a person speaks is an essential element of daily life.
</p>`;