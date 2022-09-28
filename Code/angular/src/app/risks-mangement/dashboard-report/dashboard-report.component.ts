import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RiskAndOpportunityService } from '@proxy/RiskAndOpportunity';
import { Type, Status } from '../module.enums';
import { ListService } from '@abp/ng.core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard-report',
  templateUrl: './dashboard-report.component.html',
  styleUrls: ['./dashboard-report.component.scss'],
  providers:[ListService]
})
export class DashboardReportComponent implements OnInit {

  Type = Type;
  Status = Status;

  constructor(
    private route:ActivatedRoute,
    private riskAndOpportunityService:RiskAndOpportunityService,
    public readonly list: ListService,
  ) { }

  selectedType;
  ngOnInit(): void {
    console.log(this.route.snapshot);
    this.selectedType = this.route.snapshot.params.typeId;

    this.getList();
  }

  activeTabName;
  items;
  totalCount;
  getList() {
    this.activeTabName = '::' +  Type[this.selectedType] + ':';
    const streamCreator = (query) => this.riskAndOpportunityService.getList({ ...query, type:this.selectedType,DepartmentId: this.route.snapshot.params.departmentId, maxResultCount:null  });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  exportexcel() {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'this fileName.xlsx');
 
  }

}
