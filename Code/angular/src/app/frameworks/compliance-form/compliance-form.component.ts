import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicableType, AssessmentService, ComplianceLevelType, DocumentedType, EffectiveType, ImplementedType, complianceLevelTypeOptions } from '@proxy/assessments';
import { finalize } from 'rxjs/operators';
import { parseISO } from 'date-fns';


@Component({
  selector: 'app-compliance-form',
  templateUrl: './compliance-form.component.html',
  styleUrls: ['./compliance-form.component.scss']
})
export class ComplianceFormComponent implements OnInit {
  @Input('controlData') controlData;


  ApplicableType = ApplicableType;
  ComplianceLevelType = ComplianceLevelType;
  DocumentedType = DocumentedType;
  ImplementedType = ImplementedType;
  EffectiveType = EffectiveType;


  complianceLevelTypeOptions = complianceLevelTypeOptions;

  constructor(
    private assessmentService: AssessmentService,
  ) { }
  
  form:FormGroup;
  ngOnInit(): void {

    // "controlId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    // "applicable": 0,
    // "complianceLevel": 1,
    // "complianceDate": "2023-05-31T09:27:09.896Z",
    // "nextComplianceDate": "2023-05-31T09:27:09.896Z",
    // "documented": 0,
    // "implemented": 0,
    // "effective": 0,
    // "documentedPercentage": 100,
    // "implementedPercentage": 100,
    // "effectivePercentage": 100,
    // "comment": "string",
    // "attachmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    // "employeeIds": [
    //   "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    // ]

    this.form = new FormGroup({
      controlId : new FormControl(this.controlData.id, Validators.required),
      applicable : new FormControl(null, Validators.required),
      complianceLevel:new FormControl(0),
      complianceDate:new FormControl(null, Validators.required),
      nextComplianceDate:new FormControl(null, Validators.required),
      documented:new FormControl(null, Validators.required),
      documentedPercentage:new FormControl(null),
      implemented:new FormControl(null, Validators.required),
      implementedPercentage:new FormControl(null),
      effective:new FormControl(null, Validators.required),
      effectivePercentage:new FormControl(null),
      comment:new FormControl(null),
      reviewerComment:new FormControl(null),
      attachmentId:new FormControl(null),
      addFiles:new FormControl(null),
      id:new FormControl(null),
      employeeIds:new FormControl(null),
    });

    this.assessmentService.getByControlId(this.controlData.id).subscribe(r => {
      this.pathFormValue(r);
    })
  }

  pathFormValue(value) {
    value['complianceDate'] = parseISO( value['complianceDate'] );
    value['nextComplianceDate'] = parseISO( value['nextComplianceDate'] );
    this.form.patchValue(value);
  }

  changeApplicable(event) {
    console.log(event);
    event.value
  }


  partsControls = ['documented','implemented','effective']
  changeAnswer(value, control) {
    this.form.controls[control + 'Percentage'].setValidators(value === 1 ? [Validators.required, Validators.min(1), Validators.max(99)] : null);
    this.form.controls[control + 'Percentage'].updateValueAndValidity();

    
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
    console.log(this.form);
    if(this.form.invalid) return;
    this.saveAssessment();
  }

  isSaving = false;
  saveAssessment() {
    // this.form.value.id ? this.assessmentService.update 
    // this.assessmentService
    this.isSaving = true;
    let value = this.form.getRawValue();
    value.applicable = value.applicable || 0;

    const request = value.id
    ? this.assessmentService.update(value.id, value)
    : this.assessmentService.create(value);

    request
    .pipe(
      finalize(() => this.isSaving = false)
    ).subscribe((res) => {
      console.log(res);
      this.pathFormValue(res);

      // this.ref.close(res);
    });

    console.log('save assessment');
  }
}
