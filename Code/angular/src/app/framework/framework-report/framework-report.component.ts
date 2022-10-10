import { ListService, LocalizationService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrameworkService } from '@proxy/frameworks';
import { ExcelService } from 'src/app/risks-mangement/dashboard-report/excel.service';
import { LangPipe } from 'src/app/shared/pipe/lang.pipe';

@Component({
  selector: 'app-framework-report',
  templateUrl: './framework-report.component.html',
  styleUrls: ['./framework-report.component.scss'],
  providers:[
    ListService,
    ExcelService,
    LangPipe
  ]
})
export class FrameworkReportComponent implements OnInit {
  data;
  excelHeader;
  constructor(
    private route:ActivatedRoute,
    private frameworkService: FrameworkService,
    private langPipe:LangPipe,
    private localizationService:LocalizationService,
    private excelService:ExcelService,
  ) { }

  items = [];

  totalCount;
  excelRows = [];

  ngOnInit(): void {
    this.excelHeader = [
      this.localizationService.instant('::FrameworkName'),
      this.localizationService.instant('::MainDomainName'),
      this.localizationService.instant('::SubDomainName'),
      this.localizationService.instant('::MainControlName'),
      this.localizationService.instant('::SubControlName'),
      this.localizationService.instant('::AssessmentApplicable'),
      this.localizationService.instant('::AssessmentComplianceLevel')
    ];

    this.frameworkService.getListFrameWorkDashBoard({FrameworkId:this.route.snapshot.params.frameworkId}).subscribe(r => {
      console.log(r);
      this.data = r;
      if(this.route.snapshot.params.mainDomainId) {
        let main = r['domainDta'].filter(d => d.maindomain.id == this.route.snapshot.params.mainDomainId)[0];
        for(let subDomain of main.childrenDomains) {
          for(let mainControl of subDomain.childrenControls) {
            for(let subControl of mainControl.subControl) {
              let sub = {...subControl}
              sub.frameworkDto = r['frameworkDto'];
              sub.mainDomain = main.maindomain
              sub.subDomain = subDomain.subdomain
              sub.mainControl = mainControl.mainControl
              // sub.assessmentDto = subControl.assessmentDto;
              this.items.push(sub);
              this.excelRows.push([
                this.langPipe.transform(r['frameworkDto'], 'name'),
                this.langPipe.transform(main.maindomain, 'name'),
                this.langPipe.transform(subDomain.subdomain, 'name'),
                this.langPipe.transform(mainControl.mainControl, 'name'),
                this.langPipe.transform(subControl.subControl, 'name'),
                subControl.assessmentDto && subControl.assessmentDto.applicable
                  ? this.localizationService.instant(
                      '::Enum:ApplicableType:' + subControl.assessmentDto.applicable
                    )
                  : '-',
                subControl.assessmentDto ? subControl.assessmentDto.complianceLevel : '-',
              ]);
            }
          }
        }

        console.log(this.items);
        console.log(this.excelRows)
      }
    })
  }


  exportexcel() {
      // let title = this.departmentName;
      // if(!this.departmentName) {
      //   title = `${ this.localizationService.instant(this.activeTabName + 'Potential')} - ${ this.localizationService.instant('::' + this.period) }`
      // }
      // this.excelService.generateExcel(title, this.activeTabName, this.rows)
      this.excelService.generateFrameWorkExcel(this.excelRows, this.excelHeader, this.excelRows[0][0] + ' - ' + this.excelRows[0][1])
    }

}
