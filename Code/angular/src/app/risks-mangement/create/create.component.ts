import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  activeTab = 1;

  form:FormGroup;

  constructor() { }

  firstForm

  ngOnInit(): void {
    this.form = new FormGroup({
      acceptance: new FormControl(null, [Validators.required]),
      acceptanceApprovedby:  new FormControl(null, [Validators.required]),
      byWhen:  new FormControl(null, [Validators.required]),
      consequence:  new FormControl(null, [Validators.required]),
      controlAssessment:  new FormControl(null, [Validators.required]),
      existingControl:  new FormControl(null, [Validators.required]),
      generalDepartmentId:  new FormControl(null, [Validators.required]),
      likelihood:  new FormControl(null, [Validators.required]),
      mitigateActionPlan:  new FormControl(null, [Validators.required]),
      objectiveEvidence:  new FormControl(null, [Validators.required]),
      potentialRisk:  new FormControl(null, [Validators.required]),
      responsibility:  new FormControl(null, [Validators.required]),
      reviewControlAssessment:  new FormControl(null, [Validators.required]),
      reviewRemarks:  new FormControl(null, [Validators.required]),
      riskContext:  new FormControl(null, [Validators.required]),
      riskTreatmentOption:  new FormControl(null, [Validators.required]),
      standardId:  new FormControl(null, [Validators.required]),
      standardReference:  new FormControl(null, [Validators.required]),
      status:  new FormControl(null, [Validators.required]),
      treatmentRemarks:  new FormControl(null, [Validators.required]),
      workFlowStages:  new FormControl(null, [Validators.required]),
    })

    this.firstForm = new FormGroup({
      nameAr:  new FormControl(null, [Validators.required]),
      nameEn:  new FormControl(null, [Validators.required]),
      detailsAr:  new FormControl(null, [Validators.required]),
      detailsEn:  new FormControl(null, [Validators.required]),
      affectDetailsAr:  new FormControl(null, [Validators.required]),
      affectDetailsEn:  new FormControl(null, [Validators.required]),
      type:  new FormControl(null, [Validators.required]),
      sectorId:  new FormControl(null, [Validators.required]),
      departmentId:  new FormControl(null, [Validators.required]),
      categoryId:  new FormControl(null, [Validators.required]),
      ownerId:  new FormControl(null, [Validators.required]),
    })
  }

}
