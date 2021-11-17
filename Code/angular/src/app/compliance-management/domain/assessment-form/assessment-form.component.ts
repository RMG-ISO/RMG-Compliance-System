import { FormMode } from './../../../shared/interfaces/form-mode';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.scss']
})
export class AssessmentFormComponent implements OnInit {
  @Input('mode') mode = FormMode.View;
  
  constructor() { }

  ngOnInit(): void {
  }

}
