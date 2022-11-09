import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form:FormGroup;
  mode;

  constructor(
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.mode = this.activatedRoute.snapshot.data.mode;
    this.form = new FormGroup({
      auditCode: new FormControl(null),
      auditTitleEn: new FormControl(null, Validators.required),
      auditTitleAr: new FormControl(null, Validators.required),
      auditDescriptionEn: new FormControl(null, Validators.required),
      auditDescriptionAr: new FormControl(null, Validators.required),
      auditFieldEn: new FormControl(null, Validators.required),
      auditFieldAr: new FormControl(null, Validators.required),
      auditSetpsEn: new FormControl(null, Validators.required),
      auditSetpsAr: new FormControl(null, Validators.required),
      departmentId: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      riskOpportunityId: new FormControl(null, Validators.required),
      frameworkId: new FormControl(null, Validators.required),
      auditors:new FormControl(null, Validators.required),
      departmentRepresentatives:new FormControl(null, Validators.required),
    });
  }

  save() {

  }
}