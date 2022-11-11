import { ConfigStateService, ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { RiskAndOpportunityService } from '@proxy/RiskAndOpportunity';
import { Type, Status, HistoryAction } from '../module.enums';
import * as moment from 'moment';
import { IdentityUserService } from '@abp/ng.identity';
import { DepartmentService } from '@proxy/departments';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[ListService]
})
export class ListComponent implements OnInit {
  Type = Type;
  Status = Status;

  constructor(
    private riskAndOpportunityService:RiskAndOpportunityService,
    public readonly list: ListService,
    private confirmation: ConfirmationService,
    private localizationService:LocalizationService,
    private configState:ConfigStateService,
    private departmentService:DepartmentService,
    private userService:IdentityUserService
  ) { }

  ngOnInit(): void {
    this.getDataFilter();
    this.getList();
  }

  searchVal
  items
  totalCount;
  DepartmentId;
  UserId;
  Potential;
  selectedType = Type.Risk;
  activeTabName;
  getList() {
    this.activeTabName = '::' +  Type[this.selectedType] + ':';
    const streamCreator = (query) => this.riskAndOpportunityService.getList({ ...query, search: this.searchVal, type:this.selectedType, ...this.filter });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      response.items.map(item => {
        // if(item['reEvaluation']) {
          // potentialNameAr
          // potentialNameEn
        // }
      })
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  delete(model: any) {
    let title = this.localizationService.currentLang.includes('ar') ?  model['nameAr'] : model['nameEn'];

    this.confirmation.warn('::DeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[title]}).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.riskAndOpportunityService.delete(model.id).subscribe(() => {
          this.list.get();

          let obj:any = {
            actionDate:moment().toISOString(),
            actionName: HistoryAction.Delete,
            riskAndOpportunityId: model.id,
            userId: this.configState.getAll().currentUser.id,
            workFlowStages: null,
          }

          // this.riskAndOpportunityService.createhistoryRisk(obj).subscribe(r => { })

        });
      }
    });
  }

  changeTab(tab) {
    this.selectedType = tab;
    this.activeTabName = '::' +  Type[this.selectedType] + ':';
    this.list.get();
  }

  departments;
  users;
  Potentials;
  Statusdrop;
  showFilters = false;
  filter = {}
  getDataFilter(){
    this.Statusdrop=[{id:1,nameAr:'مفتوح',nameEn:'Open'},{id:2,nameAr:'مغلق',nameEn:'Close'}];
    this.Potentials = [
      { id: 1, value: 0, name:'VeryLow' },
      { id: 2, value: 3, name:'Low' },
      { id: 6, value: 4, name: 'Medium' },
      { id: 9, value: 8, name: 'High' },
      { id: 12, value: 16, name: 'VeryHigh' },
    ];
    
    // [
    //   { id: 1, nameEn: 'Very Low', nameAr: 'ضعيف جدا' },
    //   { id: 2, nameEn: 'Low', nameAr: 'ضعيف ' },
    //   { id: 4, nameEn: 'Medium', nameAr: 'متوسط' },
    //   { id: 8, nameEn: 'High', nameAr: 'عالي' },
    //   { id: 12, nameEn: 'very High', nameAr: 'عالي جدا' },
    // ];

    this.departmentService.getList({search:null, maxResultCount:null }).subscribe(r => {
      this.departments = r.items;
    })
    this.userService.getList({maxResultCount:null, filter:null}).subscribe(r => {
      this.users = r.items
    });
  }

  changeFilter(val) {
    this.filter = {...this.filter, ...val};
    this.list.get();
  }
}