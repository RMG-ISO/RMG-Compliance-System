import { LocalizationService,ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';

import { RiskAndOpportunityService } from '@proxy/RiskAndOpportunity';
import { SignalrService } from '@proxy/signalrService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[ListService]
})
export class DashboardComponent implements OnInit {

  constructor(
    private localizationService:LocalizationService,
    private signalrService:SignalrService,
    private riskAndOpportunityService:RiskAndOpportunityService,
    public readonly list: ListService,
  ) { }

  ngOnInit(): void {
 
    this.signalrService.initiateSignalrConnection().then(x => {
      this.signalrService.connection.on('RisksOpportunities', (result: any) => {
        console.log("RisksOpportunities",result);
      });
    })
    this.signalrService.connection.on('RisksOpportunities', (result: any) => {
      console.log("RisksOpportunities",result);
    });

    this.getListRisks();
    this.getListOpportunities();
  }
  getListRisks() {
    const streamCreator = (query) => this.riskAndOpportunityService.getList({ ...query, search: '', type:1 });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.itemsRisk = response.items;
      console.log("RisksOpportunities",this.itemsRisk);
      this.totalCountRisk = response.totalCount;
      this.getPotentialsLevels();


    this.setChartOneOptions();
    this.setChartTwoOptions();
    this.setChartThreeOptions();
    this.setchartFourOptions();
    this.setChartFiveOptions();
    this.setChartSixOptions();
    this.setChartSevenOptions();
    this.setChartEightOptions()
    });
  }
  getListOpportunities() {
    const streamCreator = (query) => this.riskAndOpportunityService.getList({ ...query, search: '', type:2 });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.itemsOpportunity = response.items;
      this.totalCountOpportunity = response.totalCount;
    });
  }
  itemsRisk=[];
  totalCountRisk;
  itemsOpportunity=[];
  totalCountOpportunity;

getPotentialsLevels(){
  this.potentials.push(
    [{likelihood:4,impact:1,Potential:4,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:4,impact:2,Potential:8,levelNum:3,levelEn:'High',levelAr:'عالي'},{likelihood:4,impact:3,Potential:12,levelNum:4,levelEn:'Very High',levelAr:'عالي جدا'},{likelihood:4,impact:4,Potential:16,levelNum:4,levelEn:'Very High',levelAr:'عالي جدا'}],
    [{likelihood:3,impact:1,Potential:3,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:3,impact:2,Potential:6,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:3,impact:3,Potential:9,levelNum:3,levelEn:'High',levelAr:'عالي'},{likelihood:3,impact:4,Potential:12,levelNum:4,levelEn:'Very High',levelAr:'عالي جدا'}],
    [{likelihood:2,impact:1,Potential:2,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:2,impact:2,Potential:4,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:2,impact:3,Potential:6,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:2,impact:4,Potential:8,levelNum:3,levelEn:'High',levelAr:'عالي'}],
    [{likelihood:1,impact:1,Potential:1,levelNum:0,levelEn:'very Low',levelAr:'ضعيف جدا'},{likelihood:1,impact:2,Potential:2,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:1,impact:3,Potential:3,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:1,impact:4,Potential:4,levelNum:2,levelEn:'Medium',levelAr:'متوسط'}],);

  this.itemsRisk.forEach((item,i)=>{
 
let levelVeryHigh=this.potentials.filter(t=>t.levelNum==4&&t.Potential==item.potential&&t.likelihood==item.likelihood&&t.impact==item.impact);
  if(levelVeryHigh.length>0)
  {
     
    this.VeryHigh.push({levelEn:levelVeryHigh.pop().levelEn,levelAr:levelVeryHigh.pop().levelAr})
  }

  let levelHigh=this.potentials.filter(t=>t.levelNum==3&&t.Potential==item.potential&&t.likelihood==item.likelihood&&t.impact==item.impact);
  if(levelHigh.length>0)
  {
    this.High.push({levelEn:levelHigh.pop().levelEn,levelAr:levelHigh.pop().levelAr})
  }
  let levelMedium=this.potentials.filter(t=>t.levelNum==2&&t.Potential==item.potential&&t.likelihood==item.likelihood&&t.impact==item.impact);
  if(levelMedium.length>0)
  {
    this.Medium.push({levelEn:levelMedium.pop().levelEn,levelAr:levelMedium.pop().levelAr})
  }
  let levelLow=this.potentials.filter(t=>t.levelNum==1&&t.Potential==item.potential&&t.likelihood==item.likelihood&&t.impact==item.impact);
  if(levelLow.length>0)
  {
    this.Low.push({levelEn:levelLow.pop().levelEn,levelAr:levelLow.pop().levelAr})
  }
  let levelveryLow=this.potentials.filter(t=>t.levelNum==0&&t.Potential==item.potential&&t.likelihood==item.likelihood&&t.impact==item.impact);
  if(levelveryLow.length>0)
  {
    this.veryLow.push({levelEn:levelveryLow.pop().levelEn,levelAr:levelveryLow.pop().levelAr})
  }
  console.log(this.VeryHigh,this.High,this.Medium,this.Low,this.veryLow);

  });
}
potentials=[];
VeryHigh=[];
High=[];
Medium=[];
Low=[];
veryLow=[];


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
        text: this.localizationService.instant('::Risk:Status'),
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
          name: this.localizationService.instant('::Risk:Status'),
          type: 'pie',
          // radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: this.itemsRisk.filter(t=>t.status==1).length, name: this.localizationService.instant('::Risk:Open') },
            { value: this.itemsRisk.filter(t=>t.status==2).length, name: this.localizationService.instant('::Risk:Close') },
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




}
