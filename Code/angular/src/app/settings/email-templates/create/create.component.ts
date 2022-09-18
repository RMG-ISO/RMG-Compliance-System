import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EmailTemplateService } from '@proxy/email-templates';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild('myckeditor') ckeditor: CKEditorComponent;
  FormMode = FormMode;

  ckeConfig = {
    // allowedContent: true,
    // forcePasteAsPlainText: true,
    // removePlugins: 'exportpdf',
  };

  form:FormGroup;
  mode;

  public Editor = ClassicEditor;

  constructor(
    private activatedRoute:ActivatedRoute,
    private emailTemplateService:EmailTemplateService,
    private router:Router
  ) {
    
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      body: new FormControl(null, Validators.required),
      key: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      notificationBody:new FormControl(null, Validators.required),
    });
    this.mode = this.activatedRoute.snapshot.data.mode;
    if (this.mode === FormMode.View) {
      this.form.disable();
      this.ckeConfig['readOnly'] = true;
      this.ckeConfig['allowedContent'] = true;
    }
    if(this.mode !== FormMode.Create) {
      this.emailTemplateService.get(this.activatedRoute.snapshot.params.id).subscribe(r => this.form.patchValue(r))
    }
  }

  // onChange($event: any): void {
  //   //this.log += new Date() + "<br />";
  // }

  // onPaste($event: any): void {
  //   //this.log += new Date() + "<br />";
  // }


  submitFlag = false;
  save() {
    // this.beforeSubmit();
    if(this.form.invalid) return;
    this.submitFlag = true;

    if (this.mode === FormMode.Create) {
      this.emailTemplateService.create(this.form.value)
      .pipe(
        finalize(() => this.submitFlag = false)
      )
      .subscribe( () => {
        this.router.navigate(['/settings/email-templates/list'])
        // this.status = 'success';
        // this.title = this.localization.instant('::Toaster:Success');
        // this.content = this.content = this.localization.instant('::Toaster:Add:Content');
        // this.showToast(this.status, this.title, this.content);
        // this.submitFlag = false;
        // this.ref.close(true)
      });
     
    } else {
      this.emailTemplateService.update(this.form.value.id, this.form.value)
      .pipe(
        finalize(() => this.submitFlag = false)
      ).subscribe( () => {
        this.router.navigate(['/settings/email-templates/list'])

        // this.status = 'success';
        // this.title = this.localization.instant('::Toaster:Success');
        // this.content = this.localization.instant('::Toaster:Edit:Content');
        // this.showToast(this.status, this.title, this.content);
        // this.ref.close(true)
      });
    }
  }
}
