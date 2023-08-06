import { Component, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { PrincipleStatus } from '@proxy/documents';

@Component({
  selector: 'app-compliance-form',
  templateUrl: './compliance-form.component.html',
  styleUrls: ['./compliance-form.component.scss']
})
export class ComplianceFormComponent {
  @Input('form') form:FormGroup;
  PrincipleStatus = PrincipleStatus;

  changeIsApplicable(group, event) {
    console.log(event)
    group.controls.status.setValidators(
      event.value == true ? [Validators.required] : null
    );
    group.controls.status.updateValueAndValidity();
  }

  changeComply(group, event) {
    console.log(event)
    group.controls.score.setValidators(
      event.value == PrincipleStatus.PartiallyComply ? [Validators.required, Validators.min(1), Validators.max(99)] : null
    );
    group.controls.score.updateValueAndValidity();
  }

  OnFileUploaded(attachmentId: string, form:FormGroup) {
    form.controls['attachmentId'].patchValue(attachmentId);
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

  saveCompliance(form:FormGroup) {
    console.log(form);
    if(form.invalid) return;
  }
}
