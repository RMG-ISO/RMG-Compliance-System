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
      level:new FormControl(null, Validators.required),
      date:new FormControl(null, Validators.required),
      nextDate:new FormControl(null, Validators.required),
      trusted:new FormControl(1, Validators.required),
      completed:new FormControl(null, Validators.required),
      effective:new FormControl(null, Validators.required),
      comment:new FormControl(null),
    })
  }

}
