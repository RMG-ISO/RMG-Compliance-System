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
      complianceLevel: new FormControl(this.assessment ? this.assessment.complianceLevel : null),
      complianceDate: new FormControl(this.assessment ? this.assessment.complianceDate : null),
      nextComplianceDate: new FormControl(this.assessment ? this.assessment.nextComplianceDate : null, Validators.required),
      documented: new FormControl(this.assessment ? this.assessment.documented : null, Validators.required),
      implemented: new FormControl(this.assessment ? this.assessment.implemented : null, Validators.required),
      effective: new FormControl(this.assessment ? this.assessment.effective : null, Validators.required),
      comment: new FormControl(this.assessment ? this.assessment.comment : null),
      attachmentId: new FormControl(this.assessment ? this.assessment.attachmentId : null),
      responsibles: new FormControl(this.assessment ? null : null),
    })

    console.log(this.form)
    this.form.disable()
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
