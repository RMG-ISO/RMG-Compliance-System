import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { RiskTreatmentService } from '@proxy/RiskTreatments';
import { RiskTreatmentDto } from '@proxy/RiskTreatments/dtos';
import { ActivatedRoute } from '@angular/router';
import { IdentityUserService } from '@abp/ng.identity';

@Component({
  selector: 'app-fourth',
  templateUrl: './fourth.component.html',
  styleUrls: ['./fourth.component.scss']
})
export class FourthComponent implements OnInit {

  constructor(
    private riskTreatmentService:RiskTreatmentService,
    public readonly list: ListService,
    private localizationService:LocalizationService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private userService:IdentityUserService
  ) { }

  users;

  ngOnInit(): void {
    this.userService.getList({maxResultCount:null, filter:null}).subscribe(r => {
      this.users = r.items
    })

    this.getList();
  }

  items;
  totalCount;
  getList() {
    const streamCreator = (query) => this.riskTreatmentService.getList({ ...query});
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }


  delete(model: any) {
    let title = this.localizationService.currentLang.includes('ar') ?  model['nameAr'] : model['nameEn'];
    this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[title]}).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.riskTreatmentService.delete(model.id).subscribe(() => this.list.get());
      }
    });
  }


  selected
  isModalOpen
  openDialog(data: RiskTreatmentDto) {
    this.selected = data;
    this.buildForm();
    this.isModalOpen = true;
  }

  form:FormGroup;
  
  buildForm() {
    this.form = new FormGroup({
      id: new FormControl(null),
      riskOpportunityId: new FormControl(this.route.snapshot.params.id),
      mitigateActionPlan: new FormControl(null, Validators.required),
      standardReference: new FormControl(null, Validators.required),
      objectiveEvidence: new FormControl(null, Validators.required),
      responsibility: new FormControl(null, Validators.required),
      byWhen: new FormControl( null , Validators.required),
      treatmentRemarks: new FormControl(null, Validators.required),
      reEvaluation: new FormControl(0),
    });
    this.form.patchValue(this.selected);
    this.form.controls.byWhen.patchValue( this.selected?.byWhen ? new Date( this.selected?.byWhen ) : new Date());
  }


  save() {
    if (this.form.invalid) return;

    const request = this.selected?.id ? this.riskTreatmentService.update(this.selected.id, this.form.value) : this.riskTreatmentService.create(this.form.value);
    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

}