import { FormGroup, FormControl } from '@angular/forms';
import { FormMode } from './../../../shared/interfaces/form-mode';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.scss']
})
export class AssessmentFormComponent implements OnInit {
  @Input('mode') mode = FormMode.View;
  form:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      reference:new FormControl('1.1.1'),
      details:new FormControl(`يجب تحديد استراتيجية الأمن السيبراني وتوثيقها واعتمادها. يجب أن يكون مدعومًا من قبل رئيس المنظمة أو من يفوضه / مندوبها
      (المشار إليه في هذه الوثيقة باسم مسؤول التخويل). يجب أن تتماشى أهداف الاستراتيجية مع القوانين واللوائح ذات الصلة.`),
      applicability:new FormControl(true),
      subForm:new FormGroup({
        complianceLevel: new FormControl('مستوى 1'),
        complianceDate: new FormControl(new Date()),
        documented:new FormControl(true),
        executed:new FormControl(1),
        effective:new FormControl(true),
        comments:new FormControl(' تعليق تجريبي تعليق تجريبي تعليق تجريبي تعليق تجريبي تعليق تجريبي تعليق تجريبي تعليق تجريبي تعليق تجريبي تعليق تجريبي '),
        responsibles:new FormControl([1,2,3]),
        attachmentId:new FormControl('cc8f65dc-a7ca-d2dc-daf8-3a003aa31bdd')
      })
    })

    console.log(this.form)
    this.form.disable()
  }

  setFormEnable() {
    this.form.controls.applicability.enable();
    this.form.controls.subForm.enable();
  }
  

}
