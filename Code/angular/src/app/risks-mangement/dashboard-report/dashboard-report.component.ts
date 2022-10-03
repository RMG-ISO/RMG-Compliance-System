import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RiskAndOpportunityService } from '@proxy/RiskAndOpportunity';
import { Type, Status } from '../module.enums';
import { ListService, LocalizationService } from '@abp/ng.core';
import { ExcelService } from './excel.service';
import { LangPipe } from 'src/app/shared/pipe/lang.pipe';
import { parseISO } from 'date-fns';

@Component({
  selector: 'app-dashboard-report',
  templateUrl: './dashboard-report.component.html',
  styleUrls: ['./dashboard-report.component.scss'],
  providers:[
    ListService,
    ExcelService,
    LangPipe
  ]
})
export class DashboardReportComponent implements OnInit {

  Type = Type;
  Status = Status;

  constructor(
    private route:ActivatedRoute,
    private riskAndOpportunityService:RiskAndOpportunityService,
    public readonly list: ListService,
    private excelService:ExcelService,
    private langPipe:LangPipe,
    private localizationService:LocalizationService,
  ) { }

  selectedType;
  ngOnInit(): void {
    this.selectedType = this.route.snapshot.params.typeId;

    this.getList();
  }

  activeTabName;
  items;
  totalCount;
  departmentName;
  rows;
  getList() {
    this.activeTabName = '::' +  Type[this.selectedType] + ':';
    const streamCreator = (query) => this.riskAndOpportunityService.getList({
      ...query,
      type:this.selectedType,
      DepartmentId: this.route.snapshot.params.departmentId,
      maxResultCount:null
    });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      if(response.items[0]) this.departmentName = response.items[0]['departmentName'];
      this.items = response.items;
      this.totalCount = response.totalCount;
      this.rows = response.items.map(row => {
        return [
          this.langPipe.transform(row, 'name'),
          row['ownerName'],
          this.langPipe.transform(row, 'potentialName'),
          this.localizationService.instant(( '::Status:' + Status[row['status']] )),
          row.creator.userName,
          row['departmentName'],
          parseISO(row['creationTime'] as any)
        ]
      })
    });
  }

  exportexcel() {
    this.excelService.generateExcel(this.departmentName, this.activeTabName, this.rows)
    // let element = document.getElementById('excel-table');
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // XLSX.writeFile(wb, 'this fileName.xlsx');
  }
}


