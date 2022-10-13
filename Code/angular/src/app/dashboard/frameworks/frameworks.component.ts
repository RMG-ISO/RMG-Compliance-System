import { LocalizationService, ListService } from '@abp/ng.core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ComplianceLevelType } from '@proxy/assessments';
import { FrameworkService } from '@proxy/frameworks/framework.service';

@Component({
  selector: 'app-frameworks',
  templateUrl: './frameworks.component.html',
  styleUrls: ['./frameworks.component.scss'],
  providers: [ListService]
})
export class FrameworksComponent implements OnInit {
  @Output('printEle') printEle = new EventEmitter();
  fontFamily = 'ElMessiri, Roboto, Helvetica Neue,  sans-serif';
  ComplianceLevelType = ComplianceLevelType;
  constructor(
    private list: ListService,
    private frameworkService: FrameworkService,
    private localizationService: LocalizationService
  ) { }

  data;
  TotalApplicable;
  TotalNotApplicable;

  pieCharts = [];
  maturityChart;
  maturityChartImg:any = {};

  ngOnInit(): void {
    this.getList();
  }


  setPieChartOptions(domain) {
    return {
      title: {
        text: this.localizationService.currentLang == 'en-GB' ? domain.maindomain.nameEn : domain.maindomain.nameAr,
        left: 'center',
        top: 10,
        textStyle: {
          color: '#000000',
          fontSize: '14px',
          fontWeight: 'normal',
          fontFamily: this.fontFamily
        },
      },
      tooltip: {},
      legend: {
        // top: 'middle',
        // orient: 'vertical',
        right: 10,
        bottom: 5
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name:
            this.localizationService.currentLang == 'en-GB' ? domain.maindomain.nameEn : domain.maindomain.nameAr,
          type: 'pie',
          // radius: [50, 250],

          // radius: [1, '50%'],
          // center: ['50%', '50%'],

          radius: [1, '40%'],
          center: ['50%', '40%'],
    
          roseType: 'area',
          itemStyle: {
            borderRadius: 8,
          },
          data: [
            {
              value: domain.levelOne,
              name: this.localizationService.instant('::Ad-hoc'),
              groupId:domain.maindomain.id + '?complianceLevel=' + ComplianceLevelType.ComplianceLevel1,
              itemStyle: {
                color: '#B00606'
              },
            },
            {
              value: domain.levelTwo,
              name: this.localizationService.instant('::RepeatableInformal'),
              groupId:domain.maindomain.id + '?complianceLevel=' + ComplianceLevelType.ComplianceLevel2,
              itemStyle: {
                color: '#E30303'
              }
            },
            {
              value: domain.levelThree,
              name: this.localizationService.instant('::StructuredFormalized'),
              groupId:domain.maindomain.id + '?complianceLevel=' + ComplianceLevelType.ComplianceLevel3,
              itemStyle: {
                color: '#F8D90E'
              }
            },
            {
              value: domain.levelfour,
              name: this.localizationService.instant('::ManagedMeasurable'),
              groupId:domain.maindomain.id + '?complianceLevel=' + ComplianceLevelType.ComplianceLevel4,
              itemStyle: {
                color: '#FFCC00'
              }
            },
            {
              value: domain.levelFive,
              name: this.localizationService.instant('::Adaptive'),
              groupId:domain.maindomain.id + '?complianceLevel=' + ComplianceLevelType.ComplianceLevel5,
              itemStyle: {
                color: '#00E355'
              }
            },
          ],
          label: {
            formatter: '{b}  \n \n {c}',
            fontSize: 12,
            fontWeight: 'bold',
            fontFamily: this.fontFamily
          },
        },
      ],
    };
  }

  setBarChart(domain) {
    return {
      // xAxis: {
      //   type: 'category',
      //   data: [
      //     this.localizationService.instant('::Ad-hoc'),
      //     this.localizationService.instant('::RepeatableInformal'),
      //     this.localizationService.instant('::StructuredFormalized'),
      //     this.localizationService.instant('::ManagedMeasurable'),
      //     this.localizationService.instant('::Adaptive'),
      //   ]
      // },
      title: {
        text: this.localizationService.currentLang == 'en-GB' ? domain.maindomain.nameEn : domain.maindomain.nameAr,
        left: 'center',
        top: 10,
        textStyle: {
          color: '#000000',
          fontSize: '14px',
          fontWeight: 'normal',
          fontFamily: this.fontFamily
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)',
        textStyle: {
          fontFamily: this.fontFamily
        }
      },
      xAxis: {
        data: [
          this.localizationService.instant('::Ad-hoc'),
          this.localizationService.instant('::RepeatableInformal'),
          this.localizationService.instant('::StructuredFormalized'),
          this.localizationService.instant('::ManagedMeasurable'),
          this.localizationService.instant('::Adaptive'),
        ],
        axisLabel: {
          inside: true,
          color: '#fff',
          rotate: 90,
          fontFamily: this.fontFamily
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        type: 'value'
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '5%',
        containLabel: true
      },
      series: [
        {
          data: [
            {
              value: domain.levelOne,
              itemStyle: {
                color: '#B00606'
              },
              groupId: 'maturityLevel?complianceLevel=' + ComplianceLevelType.ComplianceLevel1,
            },
            {
              groupId: 'maturityLevel?complianceLevel=' + ComplianceLevelType.ComplianceLevel2,
              value: domain.levelTwo,
              itemStyle: {
                color: '#E30303'
              }
            },
            {
              groupId: 'maturityLevel?complianceLevel=' + ComplianceLevelType.ComplianceLevel3,
              value: domain.levelThree,
              itemStyle: {
                color: '#F8D90E'
              }
            },
            {
              groupId: 'maturityLevel?complianceLevel=' + ComplianceLevelType.ComplianceLevel4,
              value: domain.levelfour,
              itemStyle: {
                color: '#FFCC00'
              }
            },
            {
              groupId: 'maturityLevel?complianceLevel=' + ComplianceLevelType.ComplianceLevel5,
              value: domain.levelFive,
              itemStyle: {
                color: '#00E355'
              }
            },
          ],
          type: 'bar'
        }
      ]
    };
  }


  chartsAfterInit = [];
  onChartInit(key, ev) {
    console.log(ev);
    if (key == null) {
      this.maturityChartImg['chart'] = ev;
      // this.maturityChartImg['img'] = ev.getDataURL({
      //   pixelRatio: 2,
      //   backgroundColor: '#f9f9f9',
      //   excludeComponents:[
      //     'legend',
      //     'toolbox'
      //   ]
      // })
      return;
    }
    this.chartsAfterInit[key] = {};
    this.chartsAfterInit[key]['chart'] = ev;
    // this.chartsAfterInit[key]['img'] = ev.getDataURL({
    //   pixelRatio: 2,
    //    backgroundColor: '#f9f9f9',
    //     excludeComponents:[
    //       'legend',
    //       'toolbox'
    //     ]
    // });
  }


  doPrint() {
    this.maturityChartImg['img'] = this.maturityChartImg['chart'].getDataURL({
      pixelRatio: 2,
       backgroundColor: '#f9f9f9',
        excludeComponents:[
          'legend',
          'toolbox'
        ]
    });
    for (let key in this.chartsAfterInit) {
      this.chartsAfterInit[key].img = this.chartsAfterInit[key].chart.getDataURL({
        pixelRatio: 2,
         backgroundColor: '#f9f9f9',
        excludeComponents:[
          'legend',
          'toolbox'
        ]
      });
    }
    setTimeout(() => {
      this.printEle.emit(document.getElementsByClassName('print-section-1')[0].innerHTML);
    }, 100)
  }

  frameworksList;
  getList() {
    this.frameworkService.getList({maxResultCount:null }).subscribe((response) => {
      this.frameworksList = response.items;
      this.getComplianceChart(this.frameworksList[0].id)
    });
  }


  selectedFrameWorkId;
  maturityData;
  getComplianceChart(frameworkId) {
    this.selectedFrameWorkId = frameworkId;
    this.frameworkService.getListFrameWorkDashBoard({ FrameworkId: frameworkId }).subscribe((response) => {
      console.log('resoin se', response)
      this.TotalApplicable = response['totalApplicable'];
      this.TotalNotApplicable = response['totalNotApplicable'];
      this.chartsAfterInit = [];
      this.maturityChart = {};
      this.domains = [];

      let maturity = {
        levelFive: 0,
        levelOne: 0,
        levelThree: 0,
        levelTwo: 0,
        levelfour: 0,
        maindomain: {
          nameAr: 'مستوى النضج',
          nameEn: 'Maturity Level'
        }
      }

      let pieCharts: any = [];
      for (let domain of response['domainDta']) {
        console.log("response['domainDta'].parentId", domain['maindomain'].parentId);
        if(domain['maindomain'].parentId) continue;

        // if(!domain['maindomain'].parentId) {
          maturity.levelOne += domain.levelOne;
          maturity.levelTwo += domain.levelTwo;
          maturity.levelThree += domain.levelThree;
          maturity.levelfour += domain.levelfour;
          maturity.levelFive += domain.levelFive;
          pieCharts.push(this.setPieChartOptions(domain));
          this.domains.push(domain);
        // }
      }
      this.maturityData = maturity;
      // this.domains.unshift(maturity);
      this.pieCharts = pieCharts;
      this.maturityChart = this.setBarChart(maturity);
    });
  }
  domains = [];

  onChartClick(domainId){
    console.log(domainId);
    window.open('/framework/report/' + this.selectedFrameWorkId + '/' + domainId  , "_blank");
  }
}