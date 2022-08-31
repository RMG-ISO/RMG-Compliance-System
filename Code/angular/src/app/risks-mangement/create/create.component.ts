import { ListService, ConfigStateService, PermissionService } from '@abp/ng.core';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RiskAndOpportunityService } from '@proxy/RiskAndOpportunity';
import { HistoryAction, Status, Type, WorkFlowStages } from '../module.enums';
import * as moment from 'moment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  activeTab = WorkFlowStages.DefineRiskAndOpportunity;
  id;
  HistoryAction = HistoryAction;
  WorkFlowStages = WorkFlowStages;

  Status = Status;

  constructor(
    private riskAndOpportunityService:RiskAndOpportunityService,
    private route: ActivatedRoute,
    private location:Location,
    public readonly list: ListService,
    private configState:ConfigStateService,
    private permissionService:PermissionService
  ) { }

  firstForm:FormGroup;
  secondForm:FormGroup;
  thirdForm:FormGroup
  fifthForm:FormGroup;

  permissions = {
    1:'ComplianceSystem.RiskAndOpportunityDefinition',
    2:'ComplianceSystem.RiskAndOpportunityAnalysis',
    3:'ComplianceSystem.RiskAndOpportunityEvaluation',
    4:'ComplianceSystem.RiskAndOpportunityTreatment',
    5:'ComplianceSystem.RiskAndOpportunityReview',
  }
  permissionsAuth = {};


  ngOnInit(): void {
    this.firstForm =    new FormGroup({
      nameAr          : new FormControl(null,       [Validators.required]),
      nameEn          : new FormControl(null,       [Validators.required]),
      detailsAr       : new FormControl(null,       [Validators.required]),
      detailsEn       : new FormControl(null,       [Validators.required]),
      affectDetailsAr : new FormControl(null,       [Validators.required]),
      affectDetailsEn : new FormControl(null,       [Validators.required]),
      type            : new FormControl(Type.Risk,  [Validators.required]),
      sectorId        : new FormControl(null,       [Validators.required]),
      departmentId    : new FormControl(null,       [Validators.required]),
      categoryId      : new FormControl(null,       [Validators.required]),
      ownerId         : new FormControl(null,       [Validators.required]),
      status          : new FormControl(Status.Open                      ),
      riskContext     : new FormControl(null,       [Validators.required]),
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
      reviewRemarks:  new FormControl(null),
      status:  new FormControl(Status.Open),
    });

    this.id = this.route.snapshot.params.id;

    if(this.id) this.getData();

    let isSetted = false;
    for(let key in this.permissions) {
      if(this.permissionService.getGrantedPolicy(this.permissions[key])) {
        if(this.id && !isSetted) {
          isSetted = true;
          this.activeTab = +key;
        }
        this.permissionsAuth[key] = true;
      } else this.permissionsAuth[key] = false;
    }
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

      // if(r['status'] == Status.Close ) {
      //   this.firstForm.disable();
      //   this.secondForm.disable();
      //   this.thirdForm.disable();
      //   this.fifthForm.disable();
      // }
    });

    this.getHistory();
  }

  historyChanges;
  totalCount
  getHistory() {
    const streamCreator = (query) => this.riskAndOpportunityService.getListhistoryRisk({
      search:null,
      riskOpportunityId:this.id,
      maxResultCount:null,
      workFlowStages:this.activeTab,
      ...query
    });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.historyChanges = response.items;
      this.totalCount = response.totalCount;
    });
  }


  submit() {
    if(this.activeTab == WorkFlowStages.DefineRiskAndOpportunity) this.submitFirst();
    else if(this.activeTab == WorkFlowStages.Analysis) this.submitSecond();
    else if (this.activeTab == WorkFlowStages.Evaluation) this.submitThird();
    else this.submitFifth();
  }

  submitFirst() {
    this.firstForm.markAllAsTouched();
    if(this.firstForm.invalid) return;
    (this.id ? this.riskAndOpportunityService.update(this.id, {...this.itemData, ...this.firstForm.value}): this.riskAndOpportunityService.create(this.firstForm.value)).subscribe(r => {
      console.log(r);
      this.itemData = r;
      this.location.replaceState(`/risks-management/${r.id}/edit`);
      let stage = HistoryAction.Update;
      if(!this.id) {
        this.activeTab = WorkFlowStages.Analysis;
        stage = HistoryAction.Create;
      }
      this.id = r.id;
      this.updateHistory(stage, WorkFlowStages.DefineRiskAndOpportunity);
    })
  }

  updateHistory(action, stage = this.activeTab) {
    let obj:any = {
      actionDate:moment().toISOString(),
      actionName: action,
      riskAndOpportunityId: this.id,
      userId: this.configState.getAll().currentUser.id,
      workFlowStages: stage,
    }

    this.riskAndOpportunityService.createhistoryRisk(obj).subscribe(r => {
      this.getHistory();
    })
  }

  submitSecond() {
    console.log(this.secondForm);
    this.secondForm.markAllAsTouched();
    if(this.secondForm.invalid) return;
    this.riskAndOpportunityService.update(this.id, {...this.itemData, ...this.secondForm.value}).subscribe(r => {
      this.activeTab = WorkFlowStages.Evaluation;
      this.updateHistory(HistoryAction.Update);
      this.itemData = r;
    })
  }

  submitThird() {
    this.thirdForm.markAllAsTouched();
    if(this.thirdForm.invalid) return;
    this.riskAndOpportunityService.update(this.id, {...this.itemData, ...this.thirdForm.value}).subscribe(r => {
      this.activeTab = WorkFlowStages.Processing;
      this.updateHistory(HistoryAction.Update);
      this.itemData = r;
    })
  }
  submitFifth() {
    this.fifthForm.markAllAsTouched();
    if(this.fifthForm.invalid) return;
    this.riskAndOpportunityService.update(this.id, {...this.itemData, ...this.fifthForm.value}).subscribe(r => {
      // this.activeTab = WorkFlowStages.Processing;
      this.updateHistory(HistoryAction.Update);
      this.itemData = r;
      this.getData();
    })
  }

  changeTab(tab) {
    this.activeTab = tab;
    this.getHistory();
  }
}
