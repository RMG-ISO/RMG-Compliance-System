import { FormGroup, FormControl } from '@angular/forms';
import { FormMode } from './../../../shared/interfaces/form-mode';
import { Component, Input, OnInit } from '@angular/core';
import { ControlDto } from '@proxy/controls/dtos';
import { AssessmentDto } from '@proxy/assessments/dtos';
import { ApplicableType, applicableTypeOptions, ComplianceLevelType, complianceLevelTypeOptions } from '@proxy/assessments';
import { ABP } from '@abp/ng.core';

@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.scss']
})
export class AssessmentFormComponent implements OnInit {
  @Input() mode = FormMode.View;
  @Input() control: ControlDto;


  form: FormGroup;
  applicableTypeOptions:ABP.Option<typeof ApplicableType>[] = applicableTypeOptions;
  complianceLevelTypeOptions:ABP.Option<typeof ComplianceLevelType>[] = complianceLevelTypeOptions;

  constructor() { }

  ngOnInit(): void {
console.log(this.applicableTypeOptions)


    this.form = new FormGroup({
      Id: new FormControl(null),
      controlId: new FormControl(null),
      applicable: new FormControl(null),
      complianceLevel: new FormControl(1),
      complianceDate: new FormControl(new Date()),
      nextComplianceDate: new FormControl(new Date()),
      documented: new FormControl(true),
      implemented: new FormControl(1),
      effective: new FormControl(true),
      comment: new FormControl(' تعليق تجريبي تعليق تجريبي تعليق تجريبي تعليق تجريبي تعليق تجريبي تعليق تجريبي تعليق تجريبي تعليق تجريبي تعليق تجريبي '),
      attaChmentId: new FormControl(null),
      responsibles: new FormControl([1, 2, 3]),
    })

    console.log(this.form)
    this.form.disable()
  }

  setFormEnable() {
    this.form.controls.applicable.enable();
    this.form.enable();
  }

  save(){
    this.form.disable();
    console.log(this.form)
    console.log(this.form.value)
  }

}
