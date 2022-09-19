import { ListService } from '@abp/ng.core';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RiskAndOpportunityService } from '@proxy/RiskAndOpportunity';
import { HistoryAction, WorkFlowStages } from '../../module.enums';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers:[ListService]
})
export class HistoryComponent implements OnInit, OnChanges {
  @Input('id') id;
  @Input('activeTab') activeTab;
  HistoryAction = HistoryAction;
  WorkFlowStages = WorkFlowStages;

  constructor(
    private riskAndOpportunityService:RiskAndOpportunityService,
    private readonly list:ListService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.activeTab.previousValue != null) {
      this.list.get();
    }  
  }

  ngOnInit(): void {
    this.getHistory();
    console.log(this.list)
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

}
