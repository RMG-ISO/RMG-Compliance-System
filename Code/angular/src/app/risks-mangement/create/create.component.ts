import { ListService, ConfigStateService, PermissionService } from '@abp/ng.core';
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RiskAndOpportunityService, HistoryRiskAndOpportunityService } from '@proxy/risks';
import { HistoryAction, Status, Type, WorkFlowStages } from '../module.enums';
import { ToasterService } from "@abp/ng.theme.shared";

import * as moment from 'moment';
import { FourthComponent } from './fourth/fourth.component';
import { RiskTreatmentService } from '@proxy/risk-treatments';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers:[ListService]
})
export class CreateComponent implements OnInit {
  @ViewChild('processingComponent') processingComponent:FourthComponent;

  activeTab = WorkFlowStages.DefineRiskAndOpportunity;
  id;
  HistoryAction = HistoryAction;
  WorkFlowStages = WorkFlowStages;

  Status = Status;

  constructor(
    private riskAndOpportunityService:RiskAndOpportunityService,
    private historyRiskAndOpportunityService:HistoryRiskAndOpportunityService,
    private route: ActivatedRoute,
    private location:Location,
    public readonly list: ListService,
    public readonly historyList: ListService,
    private configState:ConfigStateService,
    private permissionService:PermissionService,
    private toasterService:ToasterService,
    private riskTreatmentService:RiskTreatmentService,
  ) { }

  firstForm:FormGroup;
  secondForm:FormGroup;
  thirdForm:FormGroup
  fourthForm:FormGroup
  fifthForm:FormGroup;

  permissions = {
    1:'ComplianceSystem.RiskAndOpportunityDefinition',
    2:'ComplianceSystem.RiskAndOpportunityAnalysis',
    3:'ComplianceSystem.RiskAndOpportunityEvaluation',
    4:'ComplianceSystem.RiskAndOpportunityTreatment',
    5:'ComplianceSystem.RiskAndOpportunityReview',
  }
  forms = {
    1:'firstForm',
    2:'secondForm',
    3:'thirdForm',
    4:'fourthForm',
    5:'fifthForm',
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
      frameWorkId     : new FormControl(null,       [Validators.required])
    });


    this.secondForm = new FormGroup({
      controlAssessment:  new FormControl(null, [Validators.required]),
      numberMatrix:  new FormControl(null, [Validators.required]),
      likelihood:  new FormControl(null, [Validators.required]),
      impact:  new FormControl(null, [Validators.required]),
      potential:  new FormControl(null, [Validators.required]),
    });

    this.thirdForm = new FormGroup({
      numberMatrix:  new FormControl(null),
      potential:  new FormControl(null),
      likelihood:  new FormControl(),
      isTreatment:  new FormControl(null, [Validators.required]),
    });

    this.fourthForm = new FormGroup({ });

    this.fifthForm = new FormGroup({
      acceptance: new FormControl(null, [Validators.required]),
      acceptanceApprovedby:  new FormControl(null, [Validators.required]),
      reviewControlAssessment:  new FormControl(null, [Validators.required]),
      reviewRemarks:  new FormControl(null),
      status:  new FormControl(Status.Open),
    });

    this.activeForm = this.firstForm;
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
      this.itemData = r;
      // r['frameworkId'] = r['frameWorkId']
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
    this.getTreatments();
  }

  submit() {
    this.activeForm.markAllAsTouched();
    if(this.activeTab == WorkFlowStages.Processing) return;
    if(this.activeForm.invalid) return;
    if(this.activeTab == WorkFlowStages.Review ) {
      if(!this.riskTreatmentsLength && this.itemData.isTreatment) {
        this.toasterService.error("::TreatmentLengthError", "");
        return;
      }
    }
    (this.id ? this.riskAndOpportunityService.update(this.id, {...this.itemData, ...this.activeForm.value}): this.riskAndOpportunityService.create(this.firstForm.value)).subscribe(r => {
      this.itemData = r;

      let stage = HistoryAction.Update;
      if(!this.id) {
        this.location.replaceState(`/risks-management/${r.id}/edit`);
        stage = HistoryAction.Create;
      }
      this.updateHistory(stage, this.activeTab);
      if(this.activeTab == WorkFlowStages.Evaluation && !this.activeForm.value.isTreatment) this.activeTab = WorkFlowStages.Review;
      else if(this.activeTab == WorkFlowStages.Review) {} 
      else this.activeTab = this.activeTab += 1;

      this.changeTab(this.activeTab);
      this.id = r.id;
    })
  }

  updateHistory(action, stage = this.activeTab, isDelete = false) {
    this.toasterService.success(isDelete ? '::SuccessfullyDeleted' : "::SuccessfullySaved", "");
    let obj:any = {
      actionDate:moment().toISOString(),
      actionName: action,
      riskAndOpportunityId: this.id,
      userId: this.configState.getAll().currentUser.id,
      workFlowStages: stage,
    }

    this.historyRiskAndOpportunityService.create(obj).subscribe(r => { });

    this.getTreatments();
  }

  riskTreatmentsLength;
  getTreatments() {
    this.riskTreatmentService.getList({ RiskOpportunityId : this.route.snapshot.params.id || this.itemData.id} as any).subscribe(r => this.riskTreatmentsLength = r.items.length )
  }

  activeForm;
  changeTab(tab) {
    if(tab == WorkFlowStages.Processing && !this.itemData.isTreatment) tab = tab - 1;
    if(tab == WorkFlowStages.Evaluation) this.thirdForm.patchValue(this.itemData);
    this.activeTab = tab;
    this.activeForm = this[this.forms[tab]];
  }

}
