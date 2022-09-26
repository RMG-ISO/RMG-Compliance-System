import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { RiskTreatmentService } from '@proxy/RiskTreatments';
import { ActivatedRoute } from '@angular/router';
import { IdentityUserService } from '@abp/ng.identity';
import { StaticDataService } from '@proxy/StaticData';
import { HistoryAction, Status } from '../../module.enums';
import { RiskAndOpportunityService } from '@proxy/RiskAndOpportunity';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-fourth',
  templateUrl: './fourth.component.html',
  styleUrls: ['./fourth.component.scss'],
  providers:[ListService]
})
export class FourthComponent implements OnInit {
  @Output('updateProcessing') updateProcessing = new EventEmitter();
  @Input('itemData') itemData;
  FormMode = FormMode;
  Status = Status;

  users;
  potentials;
  standards;
  ListStatus = [
    {
      "id": 1,
      "nameEn": "Waiting ",
      "nameAr": "قيد الانتظار "
    },
    {
      "id": 2,
      "nameEn": "Started ",
      "nameAr": "تم البدء"
    },
    {
      "id": 3,
      "nameEn": "In Progress",
      "nameAr": "في تقدم"
    },
    {
      "id": 4,
      "nameEn": "Completed ",
      "nameAr": "تمت"
    },
    {
      "id": 5,
      "nameEn": "Late",
      "nameAr": "متاخر"
    },
    {
      "id": 6,
      "nameEn": "Canceled ",
      "nameAr": "تم الالغاء"
    }
  ];
  data=[];
  items;
  totalCount;

  constructor(
    private riskTreatmentService:RiskTreatmentService,
    public readonly list: ListService,
    private localizationService:LocalizationService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private userService:IdentityUserService,
    private staticDataService:StaticDataService,
    private riskAndOpportunityService:RiskAndOpportunityService,
    private dialog:MatDialog,
    private toasterService:ToasterService
  ) { }


  ngOnInit(): void {
    this.userService.getList({maxResultCount:null, filter:null}).subscribe(r => {
      this.users = r.items
    });

      this.potentials =[{id:1,nameEn:'Very Low',nameAr:'ضعيف جدا'},{id:2,nameEn:'Low',nameAr:'ضعيف '},{id:4,nameEn:'Medium',nameAr:'متوسط'},{id:8,nameEn:'High',nameAr:'عالي'},{id:12,nameEn:'very High',nameAr:'عالي جدا'}];
    this.staticDataService.getList({Type:'9', search:null, maxResultCount:null }).subscribe(r => {
      this.standards = r.items;
    });

   //this.signalrService.initiateSignalrConnection();
    this.getList();
  }


  getList() {
    const streamCreator = (query) => this.riskTreatmentService.getList({ RiskOpportunityId :this.route.snapshot.params.id || this.itemData.id, sorting: 'creationtime desc', ...query});
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }


  delete(model: any) {
    let title = this.localizationService.currentLang.includes('ar') ?  model['nameAr'] : model['nameEn'];
    this.confirmation.warn('::DeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[title]}).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.riskTreatmentService.delete(model.id).subscribe(() => this.list.get());
        this.update(HistoryAction.DeletePlanAction);
      }
    });
  }

  reEvaluate(value) {
    this.riskAndOpportunityService.update(this.route.snapshot.params.id, {...this.itemData, reEvaluation: value, potentialRisk: value }).subscribe(r => {
    })
  }


  @ViewChild('dialogRef') dialogRef;
  openDialog(data = {riskOpportunityId : this.route.snapshot.params.id || this.itemData.id }, mode = FormMode.Create) {
    data['mode'] = mode;
    let ref = this.dialog.open(this.dialogRef, {  data, maxHeight:'80vh' });
    ref.afterClosed().subscribe(r => {
      if(r) this.update(r);
    })
  }


  update(action) {
    this.updateProcessing.emit(action);
    this.list.get();
    console.log('this.getin list')
  }
}
