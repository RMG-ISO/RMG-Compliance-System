import { ConfigStateService, ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { RiskAndOpportunityService } from '@proxy/RiskAndOpportunity';
import { Type, Status, HistoryAction } from '../module.enums';
import * as moment from 'moment';


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
    private configState:ConfigStateService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  searchVal
  items
  totalCount;
  selectedType = Type.Risk;
  activeTabName;
  getList() {
    this.activeTabName = '::' +  Type[this.selectedType] + ':';
    const streamCreator = (query) => this.riskAndOpportunityService.getList({ ...query, search: this.searchVal, type:this.selectedType });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
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

}
