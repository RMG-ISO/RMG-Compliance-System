import { LocalizationService, ListService } from '@abp/ng.core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  maturityChartImg = {

  };
  ngOnInit(): void {
    debugger;
    this.getList();

    this.FrameworkId = 'bf9d539a-ac38-5ce8-f371-3a00694ce9a6';
    this.getComplianceChart(this.FrameworkId)
  }


  setPieChartOptions(framework) {
    return {
      title: {
        text: this.localizationService.currentLang == 'en-GB' ? framework.subdomain.nameEn : framework.subdomain.nameAr,
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
        bottom: 0
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
            this.localizationService.currentLang == 'en-GB' ? framework.subdomain.nameEn : framework.subdomain.nameAr,
          type: 'pie',
          // radius: [50, 250],
          radius: [1, '50%'],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8,
          },
          data: [
            {
              value: framework.levelOne,
              name: this.localizationService.instant('::Ad-hoc'),
              itemStyle: {
                color: '#B00606'
              }
            },
            {
              value: framework.levelTwo,
              name: this.localizationService.instant('::RepeatableInformal'),
              itemStyle: {
                color: '#E30303'
              }
            },
            {
              value: framework.levelThree,
              name: this.localizationService.instant('::StructuredFormalized'),
              itemStyle: {
                color: '#F8D90E'
              }
            },
            {
              value: framework.levelfour,
              name: this.localizationService.instant('::ManagedMeasurable'),
              itemStyle: {
                color: '#FFCC00'
              }
            },
            {
              value: framework.levelFive,
              name: this.localizationService.instant('::Adaptive'),
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

  setBarChart(framework) {
    debugger;
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
        text: this.localizationService.currentLang == 'en-GB' ? framework.subdomain.nameEn : framework.subdomain.nameAr,
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
        bottom: '1%',
        containLabel: true
      },
      series: [
        {
          data: [
            {
              value: framework.levelOne,
              itemStyle: {
                color: '#B00606'
              }
            },
            {
              value: framework.levelTwo,
              itemStyle: {
                color: '#E30303'
              }
            },
            {
              value: framework.levelThree,
              itemStyle: {
                color: '#F8D90E'
              }
            },
            {
              value: framework.levelfour,
              itemStyle: {
                color: '#FFCC00'
              }
            },
            {
              value: framework.levelFive,
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
    if (key == null) {
      console.log(ev);
      this.maturityChartImg['chart'] = ev;
      this.maturityChartImg['img'] = ev.getDataURL({
        pixelRatio: 2,
        backgroundColor: '#fff'
      })
      console.log('maturityChartImg', !!this.maturityChartImg)
      return;
    }
    this.chartsAfterInit[key] = {};
    this.chartsAfterInit[key]['chart'] = ev;
    this.chartsAfterInit[key]['img'] = ev.getDataURL({
      pixelRatio: 2,
      backgroundColor: '#fff'
    });
  }


  doPrint() {
    this.maturityChartImg['img'] = this.maturityChartImg['chart'].getDataURL({
      pixelRatio: 2,
      backgroundColor: '#fff'
    });
    for (let key in this.chartsAfterInit) {
      this.chartsAfterInit[key].img = this.chartsAfterInit[key].chart.getDataURL({
        pixelRatio: 2,
        backgroundColor: '#fff'
      });
    }
    setTimeout(() => {
      this.printEle.emit(document.getElementsByClassName('print-section-1')[0].innerHTML);
    }, 100)
  }
  FrameworkId;
  Frameworks;
  getList(search = null) {
    const streamCreator = (query) => this.frameworkService.getList({ ...query, search: search });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      debugger;
      this.Frameworks = response.items;
    });
  }



  getComplianceChart(frameworkId) {
    this.frameworkService.getListFrameWorkDashBoard({ FrameworkId: frameworkId }).subscribe((response) => {
      debugger;
      this.data = response[0];
      let maturity = {
        levelFive: 0,
        levelOne: 0,
        levelThree: 0,
        levelTwo: 0,
        levelfour: 0,
        domaindDta: {
          nameAr: 'مستوى النضج',
          nameEn: 'Maturity Level'
        }
      }

      let pieCharts: any = [

      ];
      for (let framework of this.data.FrameworkData) {
        debugger;
        this.TotalApplicable = framework.totalApplicable;
        this.TotalNotApplicable = framework.totalNotApplicable;
        this.domains = framework.domaindDta;
        let domainsDta = framework['domaindDta'];
        for (let domain of domainsDta) {
          maturity.levelOne += domain.levelOne;
          maturity.levelTwo += domain.levelTwo;
          maturity.levelThree += domain.levelThree;
          maturity.levelfour += domain.levelfour;
          maturity.levelFive += domain.levelFive;
          pieCharts.push(this.setPieChartOptions(domain));
        }
      }
      this.domains.unshift(maturity);
      this.pieCharts = pieCharts;
      this.maturityChart = this.setBarChart(maturity);
    });
  }
  domains = [];


  getDomains(ev) {
    debugger;
    console.log(ev);
    this.getComplianceChart(ev);
  }


}


/*

  chartOneOptions;
  setChartOneOptions() {
    this.chartOneOptions = {
      title: {
        text: this.localizationService.instant('::Dashboard:TotalRequirementsMaturityLevel'),
        left: 'center',
        bottom: 25,
        textStyle: {
          color: '#000000',
          fontSize:'14px',
          fontWeight:'normal'
        }
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true }
        }
      },
      legend: {
        left: '10%',
        bottom:'0%'
      },
      tooltip: {},
      xAxis:[
        {
          type: 'category',
          boundaryGap: true,
        },
        {
          type: 'category',
          boundaryGap: true,
        },
        {
          type: 'category',
          boundaryGap: true,
        },
        {
          type: 'category',
          boundaryGap: true,
        },
        {
          type: 'category',
          boundaryGap: true,
        }
      ],
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: this.localizationService.instant('::Dashboard:Initial'),
          type: 'bar',
          data: [72],
          itemStyle: {
            color: '#ED7D31'
          },
          label: {
            show: true,
            position: 'top'
          }
        },
        {
          name: this.localizationService.instant('::Dashboard:Managed'),
          data: [12],
          type: 'bar',
          itemStyle: {
            color: '#FF0000'
          },
          label: {
            show: true,
            position: 'top'
          }
        },
        {
          data: [89],
          name: this.localizationService.instant('::Dashboard:Defined'),
          type: 'bar',
          itemStyle: {
            color: '#FFC000'
          },
          label: {
            show: true,
            position: 'top'
          }
        },
        {
          name: this.localizationService.instant('::Dashboard:QuantitativelyManaged'),
          data: [1],
          type: 'bar',
          itemStyle: {
            color: '#FDFD79'
          },
          label: {
            show: true,
            position: 'top'
          }
        },
        {
          data: [5],
          type: 'bar',
          name: this.localizationService.instant('::Dashboard:Optimizing'),
          itemStyle: {
            color: '#00B050'
          },
          label: {
            show: true,
            position: 'top'
          }
        }
      ]
    };
  }



  chartThreeOptions
  setChartThreeOptions() {
    this.chartThreeOptions = {
      title: {
        text: this.localizationService.instant('::Dashboard:CybersecurityGovernance'),
        left: 'center',
        top: 10,
        textStyle: {
          color: '#000000',
          fontSize:'14px',
          fontWeight:'normal'
        }
      },
      tooltip:{},
      legend: {
        top: 'bottom'
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: this.localizationService.instant('::Dashboard:CybersecurityGovernance'),
          type: 'pie',
          // radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 40, name: this.localizationService.instant('::Dashboard:Initial') },
            { value: 38, name: this.localizationService.instant('::Dashboard:Managed') },
            { value: 32, name: this.localizationService.instant('::Dashboard:Defined') },
            { value: 30, name: this.localizationService.instant('::Dashboard:QuantitativelyManaged') },
            { value: 28, name: this.localizationService.instant('::Dashboard:Optimizing') },
          ]
        }
      ]
    };
  }

  chartFourOptions
  setchartFourOptions() {
    this.chartFourOptions = {
      legend: {
        data: [this.localizationService.instant('::Dashboard:RecommendedLevel'), this.localizationService.instant('::Dashboard:AsIsStatus')],
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true }
        }
      },
      tooltip:{},
      radar: {
        // shape: 'circle',
        indicator: [
          { name: this.localizationService.instant('::Dashboard:CybersecurityGovernance'), max: 100 },
          { name: this.localizationService.instant('::Dashboard:IndustrialControl'), max: 100 },
          { name: this.localizationService.instant('::Dashboard:ThirdParty'), max: 100 },
          { name: this.localizationService.instant('::Dashboard:CybersecurityResilience'), max: 100 },
          { name: this.localizationService.instant('::Dashboard:CybersecurityDefense'), max: 100 },
        ]
      },
      series: [
        {
          // name: 'Budget vs spending',
          type: 'radar',
          label: {
            show: true,
            // formatter: function (params) {
            //   return params.value;
            // }
          },
          data: [
            {
              value: [100, 100, 100, 100, 100],
              name: this.localizationService.instant('::Dashboard:RecommendedLevel')
            },
            {
              value: [60, 0, 50, 20, 40],
              name: this.localizationService.instant('::Dashboard:AsIsStatus'),
            }
          ]
        }
      ]
    };
  }

  chartFiveOptions
  setChartFiveOptions() {
    this.chartFiveOptions = {
      legend: {},
      tooltip: {},

      xAxis: {
        type: 'category',
        axisTick: { show: false },
        data: [
          {
            value:'Cybersecurity',
            textStyle:{
              fontSize:11
            }
          },
          {
            value:this.localizationService.instant('::Dashboard:CybersecurityDefense'),
            textStyle:{
              fontSize:11
            }
          },
          {
            value:this.localizationService.instant('::Dashboard:CybersecurityResilience'),
            textStyle:{
              fontSize:11
            }
          },
          {
            value:`Third-Party and Cloud Computing Cybersecurity`,
            textStyle:{
              fontSize:11
            }
          },
          {
            value:this.localizationService.instant('::Dashboard:IndustrialControl'),
            textStyle:{
              fontSize:11
            }
          }
        ],
        axisLabel:{
          rotate:5
        }
       },
      yAxis: {
        type: 'value'
      },

      series: [

        {
          name: this.localizationService.instant('::Dashboard:AsIsStatus'),
          type: 'bar',
          barGap: 0,
          itemStyle: {
            color: '#C10000'
          },

          data: [59, 37, 20, 54, 0]
        },
        {
          name: this.localizationService.instant('::Dashboard:RecommendedLevel'),
          type: 'bar',
          barGap: 0,
          itemStyle: {
            color: '#262D36'
          },

          data: [100, 100, 100, 100, 100]
        },
      ]

    };
  }


  chartSixOptions
  setChartSixOptions() {
    this.chartSixOptions = {
      title: {
        text: this.localizationService.instant('::Dashboard:CybersecurityResilience'),
        left: 'center',
        top: 10,
        textStyle: {
          color: '#000000',
          fontSize:'14px',
          fontWeight:'normal'
        }
      },
      legend: {
        top: 'bottom'
      },
      tooltip:{},
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: this.localizationService.instant('::Dashboard:CybersecurityGovernance'),
          type: 'pie',
          // radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 0, name: this.localizationService.instant('::Dashboard:Initial') },
            { value: 6, name: this.localizationService.instant('::Dashboard:Managed') },
            { value: 0, name: this.localizationService.instant('::Dashboard:Defined') },
            { value: 0, name: this.localizationService.instant('::Dashboard:QuantitativelyManaged') },
            { value: 0, name: this.localizationService.instant('::Dashboard:Optimizing') },
          ]
        }
      ]
    };
  }


  chartSevenOptions
  setChartSevenOptions() {
    this.chartSevenOptions = {
      title: {
        text: this.localizationService.instant('::Dashboard:CybersecurityDefense'),
        left: 'center',
        top: 10,
        textStyle: {
          color: '#000000',
          fontSize:'14px',
          fontWeight:'normal'
        }
      },
      tooltip:{},
      legend: {
        top: 'bottom'
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: this.localizationService.instant('::Dashboard:TotalRequirements'),
          type: 'pie',
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 56, name: this.localizationService.instant('::Dashboard:Initial') },
            { value: 12, name: this.localizationService.instant('::Dashboard:Managed') },
            { value: 42, name: this.localizationService.instant('::Dashboard:Defined') },
            { value: 0, name: this.localizationService.instant('::Dashboard:QuantitativelyManaged') },
            { value: 20, name: this.localizationService.instant('::Dashboard:Optimizing') },
          ]
        }
      ]
    };
  }


  chartEightOptions
  setChartEightOptions() {
    this.chartEightOptions = {
      title: {
        text: this.localizationService.instant('::Dashboard:ThirdParty'),
        left: 'center',
        top: 10,
        textStyle: {
          color: '#000000',
          fontSize:'14px',
          fontWeight:'normal'
        }
      },
      tooltip:{},
      legend: {
        top: 'bottom'
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: this.localizationService.instant('::Dashboard:TotalRequirements'),
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 0, name: this.localizationService.instant('::Dashboard:Initial') },
            { value: 2, name: this.localizationService.instant('::Dashboard:Managed') },
            { value: 11, name: this.localizationService.instant('::Dashboard:Defined') },
            { value: 0, name: this.localizationService.instant('::Dashboard:QuantitativelyManaged') },
            { value: 0, name: this.localizationService.instant('::Dashboard:Optimizing') },
          ]
        }
      ]
    };
  }

*/
