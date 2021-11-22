import { FormGroup, FormControl } from '@angular/forms';
import { FormMode } from './../../../shared/interfaces/form-mode';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlDto } from '@proxy/controls/dtos';
import { AssessmentDto } from '@proxy/assessments/dtos';
import { ApplicableType, applicableTypeOptions, ComplianceLevelType, complianceLevelTypeOptions, DocumentedType, documentedTypeOptions, EffectiveType, effectiveTypeOptions, ImplementedType, implementedTypeOptions } from '@proxy/assessments';
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

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    console.log(this.applicableTypeOptions)

    this.getEmployees();
    this.createForm();
  }

  getEmployees() {
    this.employeeService.getEmployeeListLookup().subscribe(employees => {
      this.employees = employees.items;
    })
  }

  createForm() {
    this.form = new FormGroup({
      Id: new FormControl(null),
      controlId: new FormControl(null),
      applicable: new FormControl(null),
      complianceLevel: new FormControl(1),
      complianceDate: new FormControl(new Date()),
      nextComplianceDate: new FormControl(new Date()),
      documented: new FormControl(0),
      implemented: new FormControl(1),
      effective: new FormControl(0),
      comment: new FormControl(null),
      attachmentId: new FormControl(null),
      responsibles: new FormControl(null),
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
