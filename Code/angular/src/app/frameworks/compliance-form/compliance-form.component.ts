import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-compliance-form',
  templateUrl: './compliance-form.component.html',
  styleUrls: ['./compliance-form.component.scss']
})
export class ComplianceFormComponent implements OnInit {

  constructor() { }
  
  form:FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      isApplicable : new FormControl(null),
      level:new FormControl(0),
      date:new FormControl(null, Validators.required),
      nextDate:new FormControl(null, Validators.required),
      trusted:new FormControl(null, Validators.required),
      trustedValue:new FormControl(null, [Validators.min(1), Validators.max(99)]),
      completed:new FormControl(null, Validators.required),
      completedValue:new FormControl(null, [Validators.min(1), Validators.max(99)]),
      effective:new FormControl(null, Validators.required),
      effectiveValue:new FormControl(null, [Validators.min(1), Validators.max(99)]),
      comment:new FormControl(null),
      reviewerComment:new FormControl(null),
      attachmentId:new FormControl(null),
      addFiles:new FormControl(null),
    })
  }

  changeApplicable(event) {
    console.log(event);
    event.value
  }


  partsControls = ['trusted','completed','effective']
  changeAnswer(value, control) {
    this.form.controls[control + 'Value'].setValidators(value === 2 ? [Validators.required, Validators.min(1), Validators.max(99)] : null);
    this.form.controls[control + 'Value'].updateValueAndValidity();

    let mustAddFiles = null;
    for(let c of this.partsControls) {
      let value = this.form.controls[c].value;
      if(value == 1 || value == 2) {
        mustAddFiles = [Validators.required];
        break;
      }
    }

    this.form.controls.comment.setValidators(mustAddFiles);
    this.form.controls.addFiles.setValidators(mustAddFiles);
    
    this.form.controls.comment.updateValueAndValidity();
    this.form.controls.addFiles.updateValueAndValidity();
  }

  OnFileUploaded(attachmentId: string) {
    this.form.controls["attachmentId"].patchValue(attachmentId);
  }

  uploading;
  OnFileBeginUpload(beginUpload: boolean) {
    this.uploading = true;
  }

  OnFileEndUpload(endUpload: boolean) {
    this.uploading = false;
    this.form.controls.addFiles.setValue(true);
  }

  save() {

  }
}
