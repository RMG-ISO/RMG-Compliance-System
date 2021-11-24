import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormMode } from './../../../shared/interfaces/form-mode';
import { Component, Input, OnInit } from '@angular/core';
import { ControlDto } from '@proxy/controls/dtos';
import { AssessmentDto } from '@proxy/assessments/dtos';
import { ApplicableType, applicableTypeOptions, AssessmentService, ComplianceLevelType, complianceLevelTypeOptions, DocumentedType, documentedTypeOptions, EffectiveType, effectiveTypeOptions, ImplementedType, implementedTypeOptions } from '@proxy/assessments';
import { ABP, SessionStateService } from '@abp/ng.core';
import { EmployeeService } from '@proxy/employees';
import { EmployeeDto } from '@proxy/employees/dtos';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.scss'],
  providers: [{
    provide: NgbDateAdapter, useClass: NgbDateNativeAdapter
  }
  ]
})
export class AssessmentFormComponent implements OnInit {
  @Input() mode = FormMode.View;
  @Input() control: ControlDto;

  form: FormGroup;
  applicableTypeOptions: ABP.Option<typeof ApplicableType>[] = applicableTypeOptions;
  complianceLevelTypeOptions: ABP.Option<typeof ComplianceLevelType>[] = complianceLevelTypeOptions;
  documentedTypeOptions: ABP.Option<typeof DocumentedType>[] = documentedTypeOptions;
  implementedTypeOptions: ABP.Option<typeof ImplementedType>[] = implementedTypeOptions;
  effectiveTypeOptions: ABP.Option<typeof EffectiveType>[] = effectiveTypeOptions;


  employees: EmployeeDto[];

  uploading: boolean = false;
  saving: boolean = false;
  assessment: AssessmentDto;
  editing: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private assessmentService: AssessmentService,
    private sessionStateService: SessionStateService
  ) { }

  ngOnInit(): void {
    console.log(this.applicableTypeOptions)

    this.createForm();

    this.getEmployees();
    this.getAssessment();
  }

  getAssessment() {
    this.assessmentService.getByControlId(this.control.id).subscribe(assessment => {
      this.assessment = assessment;
      console.log('assessment');
      console.log(assessment);
      this.createForm();
      this.applicableChange(assessment?.applicable);

    })
  }

  getEmployees() {
    this.employeeService.getEmployeeListLookup().subscribe(employees => {
      this.employees = employees.items;
    })
  }

  createForm() {
    this.form = new FormGroup({
      Id: new FormControl(this.assessment ? this.assessment.id : null),
      controlId: new FormControl(this.control.id),
      applicable: new FormControl(this.assessment ? this.assessment.applicable : null, Validators.required),
      complianceLevel: new FormControl(),
      complianceDate: new FormControl(),
      nextComplianceDate: new FormControl(),
      documented: new FormControl(),
      implemented: new FormControl(),
      effective: new FormControl(),
      comment: new FormControl(),
      attachmentId: new FormControl(),
      employeeIds: new FormControl(),
    })

    console.log(this.form)
    this.form.disable();

  }


  save() {
    if (this.form.valid) {
      this.saving = true;
      if (this.assessment)
        this.assessmentService.update(this.assessment.id, this.form.value).subscribe(r => {
          console.log(r)
          this.cancel()
          this.saving = false;
        }, err => {
          this.saving = false;
        });
      else
        this.assessmentService.create(this.form.value).subscribe(r => {
          console.log(r);
          this.cancel()
          this.saving = false;
        }, err => {
          this.saving = false;
        });
    }
    else
      return
  }

  cancel() {
    this.editing = false;
    this.getAssessment()
    // this.form.get('applicable').disable();
    this.form.disable();
  }

  startEditing() {
    this.form.enable();
    // console.log(this.form.get('applicable').enabled)
    // this.form.get('applicable').enable();
    this.editing = true;
  }

  OnFileUploaded(attachmentId: string) {
    this.form.controls["attachmentId"].patchValue(attachmentId);
  }
  OnFileBeginUpload(beginUpload: boolean) {
    this.uploading = true;
  }

  OnFileEndUpload(endUpload: boolean) {
    this.uploading = false;
  }
  applicableChange(value) {
    console.log(value)
    console.log(value)
    if (value === 0) {
      this.form.get('complianceLevel').setValidators([]);
      this.form.get('complianceLevel').patchValue(null);

      this.form.get('complianceDate').setValidators([]);
      this.form.get('complianceDate').patchValue(null);

      this.form.get('nextComplianceDate').setValidators([]);
      this.form.get('nextComplianceDate').patchValue(null);

      this.form.get('documented').setValidators([]);
      this.form.get('documented').patchValue(null);

      this.form.get('implemented').setValidators([]);
      this.form.get('implemented').patchValue(null);

      this.form.get('effective').setValidators([]);
      this.form.get('effective').patchValue(null);

      this.form.get('comment').setValidators([]);
      this.form.get('comment').patchValue(null);

      this.form.get('attachmentId').setValidators([]);
      this.form.get('attachmentId').patchValue(null);

      this.form.get('employeeIds').setValidators([]);
      this.form.get('employeeIds').patchValue(null);
    }
    else if (value === 1) {
      this.form.get('complianceLevel').setValidators([]);
      this.form.get('complianceLevel').patchValue(this.assessment ? this.assessment.complianceLevel : null);

      this.form.get('complianceDate').setValidators([]);
      this.form.get('complianceDate').patchValue(this.assessment ? new Date(this.assessment.complianceDate) : null);

      this.form.get('nextComplianceDate').setValidators([Validators.required]);
      this.form.get('nextComplianceDate').patchValue(this.assessment ? new Date(this.assessment.nextComplianceDate) : null);

      this.form.get('documented').setValidators([Validators.required]);
      this.form.get('documented').patchValue(this.assessment ? this.assessment.documented : null);

      this.form.get('implemented').setValidators([Validators.required]);
      this.form.get('implemented').patchValue(this.assessment ? this.assessment.implemented : null);

      this.form.get('effective').setValidators([Validators.required]);
      this.form.get('effective').patchValue(this.assessment ? this.assessment.effective : null);

      this.form.get('comment').setValidators([]);
      this.form.get('comment').patchValue(this.assessment ? this.assessment.comment : null);

      this.form.get('attachmentId').setValidators([]);
      this.form.get('attachmentId').patchValue(this.assessment ? this.assessment.attachmentId : null);

      this.form.get('employeeIds').setValidators([Validators.required]);
      this.form.get('employeeIds').patchValue(this.assessment ? this.assessment.employees.map(t => t.id) : null);
    }

  }

  getLocalizationByCurrentLanguage(localizationKey: string) {
    let langKey = 'En';
    let lang = this.sessionStateService.getLanguage();
    if (lang == 'ar-EG') langKey = 'Ar';
    return localizationKey + langKey;
  }

  getEmployeesName() {
    return this.assessment.employees.map(t => t.name)
  }
}
