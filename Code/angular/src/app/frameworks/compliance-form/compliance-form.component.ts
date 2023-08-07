import { Component, Input, OnInit, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ApplicableType,
  AssessmentService,
  ComplianceLevelType,
  DocumentedType,
  EffectiveType,
  ImplementedType,
  complianceLevelTypeOptions,
  priorityTypeOptions,
} from '@proxy/assessments';
import { finalize } from 'rxjs/operators';
import { parseISO } from 'date-fns';
import { ComplianceStatus } from '@proxy/shared';
import { ToasterService } from '@abp/ng.theme.shared';
import { priorityOptions } from '@proxy/notifications';
import { DateValidators } from 'src/app/shared/validators/date-validator';

@Component({
  selector: 'app-compliance-form',
  templateUrl: './compliance-form.component.html',
  styleUrls: ['./compliance-form.component.scss'],
})
export class ComplianceFormComponent implements OnInit, OnChanges {
  @Input('controlData') controlData;
  @Input('domainData') domainData;
  @Input('frameWorkData') frameWorkData;
  @Input('userId') userId;
  
  ApplicableType = ApplicableType;
  ComplianceLevelType = ComplianceLevelType;
  DocumentedType = DocumentedType;
  ImplementedType = ImplementedType;
  EffectiveType = EffectiveType;

  complianceLevelTypeOptions = complianceLevelTypeOptions;

  ComplianceStatus = ComplianceStatus;

  priorityTypeOptions = priorityTypeOptions;
  
  constructor(
    private assessmentService: AssessmentService,
    private toasterService: ToasterService
  ) {}

  form: FormGroup;
  assessmentData;
  ngOnInit(): void {
    this.form = new FormGroup({
      controlId: new FormControl(this.controlData.id, Validators.required),
      applicable: new FormControl(null, Validators.required),
      complianceLevel: new FormControl(null, Validators.required),
      complianceDate: new FormControl(null, Validators.required),
      nextComplianceDate: new FormControl(null, Validators.required),
      documented: new FormControl(null, Validators.required),
      documentedPercentage: new FormControl(null),
      implemented: new FormControl(null, Validators.required),
      implementedPercentage: new FormControl(null),
      effective: new FormControl(null, Validators.required),
      effectivePercentage: new FormControl(null),
      comment: new FormControl(null),
      reviewerComment: new FormControl(null),
      attachmentId: new FormControl(null),
      // addFiles: new FormControl(null),
      id: new FormControl(null),
      employeeIds: new FormControl(null),
      priority: new FormControl(null, this.frameWorkData.hasPriority ? Validators.required : null),
    }, {
      validators:[
        // DateValidators.MinDate('complianceDate'),
        DateValidators.ValidateTwoDates('complianceDate', 'nextComplianceDate')
      ]
    });

    this.assessmentService.getByControlId(this.controlData.id).subscribe(r => {
      this.pathFormValue(r);
      this.assessmentData = r;

    });
  }

  ngOnChanges() {
    setTimeout(() => {
      if (this.frameWorkData.ownerId !== this.userId) this.form.controls['applicable'].disable();

      if (this.form) {
        if (
          this.domainData.complianceStatus == ComplianceStatus.ReadyForInternalAssessment ||
          this.domainData.complianceStatus == ComplianceStatus.Approved ||
          this.frameWorkData.complianceStatus == ComplianceStatus.Approved ||
          this.domainData.complianceStatus == ComplianceStatus.ReadyForRevision
        ) {
          this.form.disable();
        } else if (
          this.frameWorkData.ownerId !== this.userId &&
          (this.domainData.complianceStatus == ComplianceStatus.NotStarted ||
            this.domainData.complianceStatus == ComplianceStatus.UnderPreparation ||
            this.domainData.complianceStatus == ComplianceStatus.UnderReRevision ||
            this.domainData.complianceStatus == ComplianceStatus.UnderRevision)
        )
          this.form.disable();
        else if (
          (this.domainData.complianceStatus == ComplianceStatus.UnderInternalAssessment ||
            this.domainData.complianceStatus == ComplianceStatus.UnderInternalReAssessment) &&
          this.domainData.responsibleId !== this.userId
        )
          this.form.disable();
      }
    });
  }

  pathFormValue(value) {
    if (value) {
      value['complianceDate'] = value['complianceDate'] ? parseISO(value['complianceDate']) : null;
      value['nextComplianceDate'] = value['nextComplianceDate']
        ? parseISO(value['nextComplianceDate'])
        : null;
    }
    this.form.patchValue(value);
  }

  partsControls = ['documented', 'implemented', 'effective'];
  changeAnswer(value, control) {
    this.form.controls[control + 'Percentage'].setValidators(
      value === 1 ? [Validators.required, Validators.min(1), Validators.max(99)] : null
    );
    this.form.controls[control + 'Percentage'].updateValueAndValidity();

    let mustAddFiles = null;
    for (let c of this.partsControls) {
      let value = this.form.controls[c].value;
      if (value == 1 || value == 2) {
        mustAddFiles = [Validators.required];
        break;
      }
    }

    this.form.controls.comment.setValidators(mustAddFiles);
    // this.form.controls.addFiles.setValidators(mustAddFiles);

    this.form.controls.comment.updateValueAndValidity();
    // this.form.controls.addFiles.updateValueAndValidity();

    this.form.updateValueAndValidity();
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

  save() {
    if (this.form.invalid) return;
    this.saveAssessment();
  }

  isSaving = false;
  saveAssessment() {
    this.isSaving = true;
    let value = this.form.getRawValue();
    value.applicable = value.applicable || 0;

    const request = value.id
      ? this.assessmentService.update(value.id, value)
      : this.assessmentService.create(value);

    request.pipe(finalize(() => (this.isSaving = false))).subscribe(res => {
      this.toasterService.success('::SuccessfullySaved', '');
      this.pathFormValue(res);
    });
  }
}
