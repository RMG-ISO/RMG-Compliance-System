import { ListService, LocalizationService } from '@abp/ng.core';
import { ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RiskAndOpportunityService } from '@proxy/RiskAndOpportunity';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(
    private riskAndOpportunityService:RiskAndOpportunityService,
    public readonly list: ListService,
    public dialog: MatDialog,
    private confirmation: ConfirmationService,
    private localizationService:LocalizationService,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  searchVal
  items
  totalCount;
  selectedType = 1;
  getList() {
    const streamCreator = (query) => this.riskAndOpportunityService.getList({ ...query, search: this.searchVal, type:this.selectedType });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }
}
