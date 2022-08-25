import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RiskAndOpportunityService } from '@proxy/RiskAndOpportunity';
import { Status } from '../list/list.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  activeTab = 1;
  id;
  form:FormGroup;

  constructor(
    private riskAndOpportunityService:RiskAndOpportunityService,
    private route: ActivatedRoute,
    private location:Location
  ) { }

  firstForm:FormGroup;
  secondForm:FormGroup;
  thirdForm:FormGroup
  fifthForm:FormGroup;

  ngOnInit(): void {

    this.form = new FormGroup({
      byWhen:  new FormControl(null, [Validators.required]),
      consequence:  new FormControl(null, [Validators.required]),
      generalDepartmentId:  new FormControl(null, [Validators.required]),
      mitigateActionPlan:  new FormControl(null, [Validators.required]),
      objectiveEvidence:  new FormControl(null, [Validators.required]),
      responsibility:  new FormControl(null, [Validators.required]),
      standardId:  new FormControl(null, [Validators.required]),
      standardReference:  new FormControl(null, [Validators.required]),
      status:  new FormControl(null, [Validators.required]),
      treatmentRemarks:  new FormControl(null, [Validators.required]),
      workFlowStages:  new FormControl(null, [Validators.required]),
    });

    this.firstForm =   new FormGroup({
      nameAr:          new FormControl(null, [Validators.required]),
      nameEn:          new FormControl(null, [Validators.required]),
      detailsAr:       new FormControl(null, [Validators.required]),
      detailsEn:       new FormControl(null, [Validators.required]),
      affectDetailsAr: new FormControl(null, [Validators.required]),
      affectDetailsEn: new FormControl(null, [Validators.required]),
      type:            new FormControl(null, [Validators.required]),
      sectorId:        new FormControl(null, [Validators.required]),
      departmentId:    new FormControl(null, [Validators.required]),
      categoryId:      new FormControl(null, [Validators.required]),
      ownerId:         new FormControl(null, [Validators.required]),
      status:          new FormControl(Status.Open),
      riskContext:     new FormControl(null, [Validators.required]),
    });
    

    this.secondForm = new FormGroup({
      existingControl:  new FormControl(null, [Validators.required]),
      controlAssessment:  new FormControl(null, [Validators.required]),
      likelihood:  new FormControl(null, [Validators.required]),
      impact:  new FormControl(null, [Validators.required]),
    });

    this.thirdForm = new FormGroup({
      potentialRisk:  new FormControl(null, [Validators.required]),
      riskTreatmentOption:  new FormControl(null, [Validators.required]),
    });

    this.fifthForm = new FormGroup({
      acceptance: new FormControl(null, [Validators.required]),
      acceptanceApprovedby:  new FormControl(null, [Validators.required]),
      reviewControlAssessment:  new FormControl(null, [Validators.required]),
      reviewRemarks:  new FormControl(null, [Validators.required]),
      status:  new FormControl(Status.Open),
    })

    this.id = this.route.snapshot.params.id;

    if(this.id) this.getData()
  }

  itemData;
  getData() {
    this.riskAndOpportunityService.get(this.id).subscribe(r => {
      console.log(r);
      this.itemData = r;
      this.firstForm.patchValue(r);
      this.secondForm.patchValue(r);
      this.thirdForm.patchValue(r);
      this.fifthForm.patchValue(r);
      // this.firstForm.patchValue(r);
    })
  }


  submit() {
    if(this.activeTab == 1) this.submitFirst();
    else if(this.activeTab == 2) this.submitSecond();
    else if (this.activeTab == 3) this.submitThird();
  }

  submitFirst() {
    console.log(this.firstForm)
    this.firstForm.markAllAsTouched();
    if(this.firstForm.invalid) return;
    (this.id ? this.riskAndOpportunityService.update(this.id, {...this.itemData, ...this.firstForm.value}): this.riskAndOpportunityService.create(this.firstForm.value)).subscribe(r => {
      console.log(r);
      this.itemData = r;
      this.location.replaceState(`/risks-management/${r.id}/edit`);
      if(!this.id) this.activeTab = 2;
      this.id = r.id;
    })
  }

  submitSecond() {
    console.log(this.secondForm);
    this.secondForm.markAllAsTouched();
    if(this.secondForm.invalid) return;
    this.riskAndOpportunityService.update(this.id, {...this.itemData, ...this.secondForm.value}).subscribe(r => {
      this.activeTab = 3
    })
  }
  submitThird() {
    console.log(this.thirdForm);
    this.thirdForm.markAllAsTouched();
    if(this.thirdForm.invalid) return;
    this.riskAndOpportunityService.update(this.id, {...this.itemData, ...this.thirdForm.value}).subscribe(r => {
      this.activeTab = 4
    })
  }
}
