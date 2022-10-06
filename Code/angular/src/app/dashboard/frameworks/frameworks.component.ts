import { LocalizationService } from '@abp/ng.core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FrameworkService } from '@proxy/frameworks/framework.service';

@Component({
  selector: 'app-frameworks',
  templateUrl: './frameworks.component.html',
  styleUrls: ['./frameworks.component.scss']
})
export class FrameworksComponent implements OnInit {
  @Output('printEle') printEle = new EventEmitter();

  constructor(
    private frameworkService:FrameworkService,
    private localizationService:LocalizationService
  ) { }

  ngOnInit(): void {
    this.frameworkService.getListFrameWorkDashBoard().subscribe((response) => {
      this.TotalApplicable=response[0].totalApplicable;
      this.TotalNotApplicable=response[0].totalNotApplicable;
      console.log(response);
    });
    this.setChartOneOptions();
    this.setChartTwoOptions();
    this.setChartThreeOptions();
    this.setchartFourOptions();
    this.setChartFiveOptions();
    this.setChartSixOptions();
    this.setChartSevenOptions();
    this.setChartEightOptions()
  }
  TotalApplicable;
  TotalNotApplicable;
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

  chartTwoOptions
  setChartTwoOptions() {
    this.chartTwoOptions = {
      title: {
        text: this.localizationService.instant('::Dashboard:TotalRequirements'),
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
          // radius: [50, 250],
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
          // radius: [50, 250],
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

  charts = {};
  onChartInit(key, ev) {
    this.charts[key] = {};
    this.charts[key]['chart'] = ev;
    this.charts[key]['img'] = ev.getDataURL({
      pixelRatio: 2,
      backgroundColor: '#fff'
    });
  }


  doPrint() {
    for(let key in this.charts) {
      this.charts[key].img = this.charts[key].chart.getDataURL({
        pixelRatio: 2,
        backgroundColor: '#fff'
      });
    }
    setTimeout(() => {
      this.printEle.emit(document.getElementsByClassName('print-section-1')[0].innerHTML);
    }, 100)
  }

}
