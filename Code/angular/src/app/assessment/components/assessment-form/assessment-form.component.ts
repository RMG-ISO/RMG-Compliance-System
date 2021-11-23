import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormMode } from './../../../shared/interfaces/form-mode';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlDto } from '@proxy/controls/dtos';
import { AssessmentDto } from '@proxy/assessments/dtos';
import { ApplicableType, applicableTypeOptions, AssessmentService, ComplianceLevelType, complianceLevelTypeOptions, DocumentedType, documentedTypeOptions, EffectiveType, effectiveTypeOptions, ImplementedType, implementedTypeOptions } from '@proxy/assessments';
import { ABP } from '@abp/ng.core';
import { EmployeeService } from '@proxy/employees';
import { EmployeeDto } from '@proxy/employees/dtos';

@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.scss']
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
  assessment: AssessmentDto;

  constructor(
    private employeeService: EmployeeService,
    private assessmentService: AssessmentService
  ) { }

  ngOnInit(): void {
    console.log(this.applicableTypeOptions)

    this.getEmployees();
    this.getAssessment();
    this.createForm();
  }

  getAssessment() {
    this.assessmentService.getByControlId(this.control.id).subscribe(assessment => {
      this.assessment = assessment;
      console.log(assessment);
    })
  }

  getEmployees() {
    this.employeeService.getEmployeeListLookup().subscribe(employees => {
      this.employees = employees.items;
      this.createForm();
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
      responsibles: new FormControl(),
    })

    console.log(this.form)
    this.form.disable()

    this.form.get('applicable').valueChanges.subscribe(applicable => {
      console.log(applicable)
      if (applicable === 0) {
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

        this.form.get('responsibles').setValidators([]);
        this.form.get('responsibles').patchValue(null);
      }
      else if (applicable === 1) {
        this.form.get('complianceLevel').setValidators([]);
        this.form.get('complianceLevel').patchValue(this.assessment ? this.assessment.complianceLevel : null);

        this.form.get('complianceDate').setValidators([]);
        this.form.get('complianceDate').patchValue(this.assessment ? this.assessment.complianceDate : null);

        this.form.get('nextComplianceDate').setValidators([Validators.required]);
        this.form.get('nextComplianceDate').patchValue(this.assessment ? this.assessment.nextComplianceDate : null);

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

        this.form.get('responsibles').setValidators([]);
        this.form.get('responsibles').patchValue(this.assessment ? null : null);
      }
    })
  }
  setFormEnable() {
    this.form.controls.applicable.enable();
    this.form.enable();
  }

  save() {
    this.form.disable();
    console.log(this.form)
    console.log(this.form.value)
    console.log(this.form.valid)
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

}
