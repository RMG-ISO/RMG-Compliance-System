import { LocalizationService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { EmailTemplateService } from '@proxy/email-templates';
import { finalize } from 'rxjs/operators';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { UploadAdapter } from 'src/app/shared/services/app-upload-adapter';
// import { MyCustomUploadAdapterPlugin } from 'src/app/shared/services/ckeditor-uploader.class';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @ViewChild('myckeditor') ckeditor: CKEditorComponent;
  FormMode = FormMode;

 

  form: FormGroup;
  mode;

  constructor(
    private activatedRoute: ActivatedRoute,
    private emailTemplateService: EmailTemplateService,
    private router: Router,
    private localizationService: LocalizationService
  ) {}

  ckeConfig = {
    language: {
      ui: 'ar',
      content: 'ar',
    },
  };
  public Editor = DecoupledEditor;

  public onReady(editor) {
    // if (editor.model.schema.isRegistered('image')) {
    //   editor.model.schema.extend('image', { allowAttributes: 'blockIndent' });
    // }

    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());

    editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      return new UploadAdapter(loader);
    };

    // MyCustomUploadAdapterPlugin(editor)
  }

  ngOnInit(): void {
    console.log(this.localizationService.currentLang);

    this.form = new FormGroup({
      id: new FormControl(null),
      body: new FormControl(null, Validators.required),
      key: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      notificationBody: new FormControl(null, Validators.required),
    });
    this.mode = this.activatedRoute.snapshot.data.mode;
    if (this.mode === FormMode.View) {
      this.form.disable();
      this.ckeConfig['readOnly'] = true;
      this.ckeConfig['allowedContent'] = true;
    }
    if (this.mode !== FormMode.Create) {
      this.form.controls.key.disable();
      this.emailTemplateService
        .get(this.activatedRoute.snapshot.params.id)
        .subscribe(r => this.form.patchValue(r));
    }

    // if (this.mode === FormMode.Edit) {
    //   this.form.controls.key.disable();
    // }
  }

  enterSubmitted;
  enterTimeout;
  enteresSubmitted() {
    this.enterSubmitted = true;
    clearTimeout(this.enterTimeout);
    this.enterTimeout = setTimeout(() => {
      this.enterSubmitted = false;
    }, 500);
  }

  submitFlag = false;
  submitTiemout;
  save() {
    clearTimeout(this.submitTiemout);
    this.submitTiemout = setTimeout(() => {
      if (this.enterSubmitted || this.form.invalid) return;

      this.submitFlag = true;

      let value = this.form.getRawValue();

      if (this.mode === FormMode.Create) {
        this.emailTemplateService
          .create(value)
          .pipe(finalize(() => (this.submitFlag = false)))
          .subscribe(() => {
            this.router.navigate(['/settings/email-templates/list']);
          });
      } else {
        this.emailTemplateService
        .update(value.id, value)
        .pipe(finalize(() => (this.submitFlag = false)))
        .subscribe(() => {
          this.router.navigate(['/settings/email-templates/list']);
        });
      }
    }, 100);
  }
}





  // config = {
  //   toolbar: {
  //     items: [
  //       'heading', '|',
  //       'fontfamily', 'fontsize',
  //       'alignment',
  //       'fontColor', 'fontBackgroundColor', '|',
  //       'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
  //       'link', '|',
  //       'outdent', 'indent', '|',
  //       'bulletedList', '-', 'numberedList', 'todoList', '|',
  //       'code', 'codeBlock', '|',
  //       'insertTable', '|',
  //       'imageUpload', 'blockQuote', '|',
  //       'todoList'
  //       ,
  //       'undo', 'redo',
  //     ],
  //     shouldNotGroupWhenFull: true,

  //   },
  //   image: {
  //     // Configure the available styles.
  //     styles: [
  //       'alignLeft', 'alignCenter', 'alignRight'
  //     ],

  //     // Configure the available image resize options.
  //     resizeOptions: [
  //       {
  //         name: 'resizeImage:original',
  //         label: 'Original',
  //         value: null
  //       },
  //       {
  //         name: 'resizeImage:50',
  //         label: '25%',
  //         value: '25'
  //       },
  //       {
  //         name: 'resizeImage:50',
  //         label: '50%',
  //         value: '50'
  //       },
  //       {
  //         name: 'resizeImage:75',
  //         label: '75%',
  //         value: '75'
  //       }
  //     ],
  //     toolbar: [
  //       'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
  //       '|',
  //       'ImageResize',
  //       '|',
  //       'imageTextAlternative'
  //     ]
  //   },
  //   language: 'en'
  // };

