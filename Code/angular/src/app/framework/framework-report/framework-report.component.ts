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

  // items = [];

  totalCount;
  excelRows = [];
  complianceLevel;
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

    this.complianceLevel = this.route.snapshot.queryParams.complianceLevel;
    console.log('complianceLevel', this.complianceLevel);
    this.frameworkService.getListFrameWorkDashBoard({FrameworkId:this.route.snapshot.params.frameworkId}).subscribe(r => {
      console.log(r);
      this.data = r;
      if(this.route.snapshot.params.mainDomainId) {
        // let main = r['domainDta'].filter(d => d.maindomain.id == this.route.snapshot.params.mainDomainId)[0];
        r['domainDta'].map(d => {
          if(this.route.snapshot.params.mainDomainId == 'maturityLevel') {
            this.loopOnDomain(d, r['frameworkDto']);
          } else {
            if(d.maindomain.id == this.route.snapshot.params.mainDomainId) {
              this.loopOnDomain(d, r['frameworkDto']);
              console.log('d', d);
            }
          }
        })
      
        // this.loopOnDomain(main, r['frameworkDto']);
        // console.log(this.items);
        console.log(this.excelRows)
      }
    })
  }


  loopOnDomain(main, frameworkDto) {
    for(let subDomain of main.childrenDomains) {
      let mainControlPushd = {};
      for(let mainControl of subDomain.childrenControls) {
        if(this.complianceLevel && this.complianceLevel != mainControl?.assessmentDto?.complianceLevel) {
        } else {
          if(mainControl.assessmentDto && !mainControlPushd[mainControl.mainControl.id]) {
            console.log('main controls', mainControl)
            // let main = {...mainControl.mainControl}
            // main.frameworkDto = frameworkDto;
            // main.mainDomain = main.maindomain
            // main.subDomain = subDomain.subdomain
            // main.mainControl = mainControl.mainControl;
            // this.items.push(main);

            this.excelRows.push([
              this.langPipe.transform(frameworkDto, 'name'),
              this.langPipe.transform(main.maindomain, 'name'),
              this.langPipe.transform(subDomain.subdomain, 'name'),
              this.langPipe.transform(mainControl.mainControl, 'name'),
              '-',
              mainControl.assessmentDto && mainControl.assessmentDto.applicable
                ? this.localizationService.instant(
                    '::Enum:ApplicableType:' + mainControl.assessmentDto.applicable
                  )
                : '-',
                mainControl.assessmentDto ? mainControl.assessmentDto.complianceLevel : '-',
            ]);
            mainControlPushd[mainControl.mainControl.id] = true;
            console.log('main contorls pushed', mainControlPushd)
          }
        }
        for(let subControl of mainControl.subControl) {
          // if( == 'maturityLevel' )
          if(this.complianceLevel && this.complianceLevel != subControl?.assessmentDto?.complianceLevel) {
            console.log('continuing');
            continue;
          }
          // let sub = {...subControl}
          // sub.frameworkDto = frameworkDto;
          // sub.mainDomain = main.maindomain
          // sub.subDomain = subDomain.subdomain
          // sub.mainControl = mainControl.mainControl
          // sub.assessmentDto = subControl.assessmentDto;
          // this.items.push(sub);
          this.excelRows.push([
            this.langPipe.transform(frameworkDto, 'name'),
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
  }

  exportexcel() {
    this.excelService.generateFrameWorkExcel(this.excelRows, this.excelHeader, this.excelRows[0][0] + ' - ' + this.excelRows[0][1])
  }

}
