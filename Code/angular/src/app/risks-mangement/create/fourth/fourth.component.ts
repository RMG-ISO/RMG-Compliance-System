import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RiskTreatmentService } from '@proxy/RiskTreatments';
import { RiskTreatmentDto } from '@proxy/RiskTreatments/dtos';
import { ActivatedRoute } from '@angular/router';
import { IdentityUserService } from '@abp/ng.identity';
import { StaticDataService } from '@proxy/StaticData';
import { HistoryAction } from '../../module.enums';

@Component({
  selector: 'app-fourth',
  templateUrl: './fourth.component.html',
  styleUrls: ['./fourth.component.scss']
})
export class FourthComponent implements OnInit {
  @Output('updateProcessing') updateProcessing = new EventEmitter();
  
  constructor(
    private riskTreatmentService:RiskTreatmentService,
    public readonly list: ListService,
    private localizationService:LocalizationService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private userService:IdentityUserService,
    private staticDataService:StaticDataService
  ) { }

  users;
  potentials;
  ngOnInit(): void {
    this.userService.getList({maxResultCount:null, filter:null}).subscribe(r => {
      this.users = r.items
    });

    this.staticDataService.getList({Type:'7', search:null, maxResultCount:null }).subscribe(r => {
      this.potentials = r.items;
    })


    this.getList();
  }

  items;
  totalCount;
  getList() {
    const streamCreator = (query) => this.riskTreatmentService.getList({ RiskOpportunityId :this.route.snapshot.params.id , ...query});
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
        this.update(HistoryAction.DeletePlanAction);
      }
    });
  }

  reEvaluate(id) {
    console.log(id)
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
      responsibility: new FormControl(null, Validators.required),
      byWhen: new FormControl( null , Validators.required),
      treatmentRemarks: new FormControl(null, Validators.required),
      reEvaluation: new FormControl(null),

      mitigateActionPlanAr: new FormControl(null, Validators.required),
      mitigateActionPlanEn: new FormControl(null, Validators.required),
      objectiveEvidenceAr: new FormControl(null, Validators.required),
      objectiveEvidenceEn: new FormControl(null, Validators.required),
      standardReferenceAr: new FormControl(null, Validators.required),
      standardReferenceEn: new FormControl(null, Validators.required),
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
      this.update(this.selected?.id ? HistoryAction.UpdatePlanAction : HistoryAction.CreatePlanAction );
    });
  }

  update(action) {
    this.updateProcessing.emit(action);
  }
}