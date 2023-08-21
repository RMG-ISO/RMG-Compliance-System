import { ToasterService } from '@abp/ng.theme.shared';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { PrincipleService, PrincipleStatus } from '@proxy/documents';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-compliance-form',
  templateUrl: './compliance-form.component.html',
  styleUrls: ['./compliance-form.component.scss']
})
export class ComplianceFormComponent {
  @Input('form') form:FormGroup;
  PrincipleStatus = PrincipleStatus;
  @Output('afterSend') afterSend = new EventEmitter()

  constructor(
    private principleService: PrincipleService,
    private toasterService:ToasterService,

  ) {

  }

  changeIsApplicable( event) {
    console.log(event)
    this.form.controls.status.setValidators(
      event.value == true ? [Validators.required] : null
    );
    if(event.value === PrincipleStatus.NotApplicable) {
      this.form.controls.status.setValue(null);
      this.form.controls.score.setValue(0);
    }
    this.form.controls.status.updateValueAndValidity();
  }

  changeComply(event) {
    console.log(event)
    this.form.controls.score.setValidators(
      event.value == PrincipleStatus.PartiallyComply ? [Validators.required, Validators.min(1), Validators.max(99)] : null
    );
    this.form.controls.score.updateValueAndValidity();
  }

  OnFileUploaded(attachmentId: string) {
    this.form.controls['attachmentId'].patchValue(attachmentId);
  }

  uploading;
  OnFileBeginUpload(beginUpload: boolean) {
    this.uploading = true;
  }

  OnFileEndUpload(endUpload: boolean) {
    this.uploading = false;
    this.uploadedCount += 1;
    // this.form.controls.addFiles.setValue(!!this.uploadedCount);
  }

  uploadedCount = 0;
  OnDeleteFile(ev) {
    this.uploadedCount -= 1;
    console.log(this.uploadedCount);
    // this.form.controls.addFiles.setValue(!!this.uploadedCount ? true : null);
  }

  isSaving
  saveCompliance() {
    console.log(this.form);
    if(this.form.invalid) return;

    let value = {...this.form.value};
    if(!value.isApplicable) value.status = value.isApplicable 


    this.isSaving = true;
    this.principleService.updateComplianceByInput(value)
    .pipe(
      finalize(() => this.isSaving = false)
    ).subscribe(response => {
      this.toasterService.success('::SuccessfullySaved');
      this.afterSend.emit({form:this.form, response});
    })
  }
}
