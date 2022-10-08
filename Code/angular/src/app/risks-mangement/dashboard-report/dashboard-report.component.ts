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

  pageTitle;
  ngOnInit(): void {
    this.selectedType = this.route.snapshot.params.typeId;
    this.period = this.route.snapshot.params.period
    this.getList();
  }

  activeTabName;
  items;
  totalCount;
  departmentName;
  rows;



  period;
  getList() {
    this.activeTabName = '::' +  Type[this.selectedType] + ':';
    let params = this.route.snapshot.params;
    let filterObj = {
      type:this.selectedType,
      DepartmentId: this.route.snapshot.params.departmentId || null,
      maxResultCount:null,
    };
    if(params.potintial) {
      let potintial = params.potintial.split('_');
      if(params.period === 'BeforeMitigation') {
        filterObj['Potential'] = potintial[0];
        filterObj['value'] = potintial[1];
      } else filterObj['reEvaluation'] = potintial[0]
    }
    const streamCreator = (query) => this.riskAndOpportunityService.getList({
      ...query,
      // type:this.selectedType,
      // DepartmentId: this.route.snapshot.params.departmentId || null,
      // maxResultCount:null,
      ...filterObj
    });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      if(response.items[0] && this.route.snapshot.params.departmentId) this.departmentName = response.items[0]['departmentName'];
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
  //   -
  //   {{ ( '::' + period) | abpLocalization }}
  //   -
  //  {{ (activeTabName +'Potential') | abpLocalization }}
    let title = this.departmentName;
    if(!this.departmentName) {
      title = `${ this.localizationService.instant(this.activeTabName + 'Potential')} - ${ this.localizationService.instant('::' + this.period) }`
    }
    this.excelService.generateExcel(title, this.activeTabName, this.rows)
  }
}


