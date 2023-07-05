import { Component, OnInit } from '@angular/core';
import { ReportsService } from '@proxy/reports';
import { ConfigStateService } from '@abp/ng.core';

@Component({
  selector: 'app-frame-report',
  templateUrl: './frame-report.component.html',
  styleUrls: ['./frame-report.component.scss']
})
export class FrameReportComponent implements OnInit {
  frameWorkData;
  activeSubTab = 'statistics';
  ChartOptions1;
  ChartOptions2;
  ChartOptions3;
  ChartOptions4;
  ChartOptions5;
  math = Math;
  constructor(
    private reportsService:ReportsService,
    private configState:ConfigStateService,

  ) { }

  ComplianceLevelByFrameworkId;
  PhaseByFrameworkId;
  ComplianceLevelByFrameworkId_chartData = {
    intial:[],
    defined:[],
    effective:[],
    measurable:[],
    mature:[],
    notImplemented:[],
    xAxisData:[]
  }
  PriorityLevelByFrameworkId;
  PriorityLevelByFrameworkId_chartData = {};
  PriorityLevelByFrameworkId_chartData2 = {
    priority_1:{complianceCount:[],controllersCount:[],complianceCounts:0,controllersCounts:0},
    priority_2:{complianceCount:[],controllersCount:[],complianceCounts:0,controllersCounts:0},
    priority_3:{complianceCount:[],controllersCount:[],complianceCounts:0,controllersCounts:0},
    xAxisData:[],
    percentage:{
      priority_1:[],
      priority_2:[],
      priority_3:[],
    },
    grand_total_controllersCounts:0,
    grand_total_complianceCounts:0
  };

  DomainControllersCount = {};

  CountByPriorityByFrameworkId = {
    total_1:0,
    total_2:0,
    total_3:0,
    total_4:0,
  };

  phase: string = '';
  status: string = '';
  priority_phase: string = '';
  phase_status_filter: string = '';
  

  
  ngOnInit(): void {
    this.phase = 'documented';
    this.priority_phase = 'documented';
    this.status = 'Yes';
    this.phase_status_filter = this.priority_phase+""+this.status;
    
    this.reportsService.getControllersByComplianceLevelByFrameworkId(this.frameWorkData.id).subscribe((r) => {
      this.ComplianceLevelByFrameworkId = r;
      for (var item of r) {
        Object.keys(item).forEach(key => {
            let val = item[key];
            if(this.ComplianceLevelByFrameworkId_chartData[key] != undefined){
              this.ComplianceLevelByFrameworkId_chartData[key].push({value:val,name:key});
            }
        });
        this.ComplianceLevelByFrameworkId_chartData['xAxisData'].push(item['domainName']);
      }
    });


    this.reportsService.getControllersByPhaseByFrameworkId(this.frameWorkData.id).subscribe((r) => {
      this.PhaseByFrameworkId = r;
    });



    this.reportsService.getControlsCountByPriorityByFrameworkId(this.frameWorkData.id).subscribe((r) => {
        for (var item of r) {
          let priority  = item['priority'];
          let controllersCount = "controllersCount_"+priority;
          if(this.CountByPriorityByFrameworkId[controllersCount] == undefined){
              this.CountByPriorityByFrameworkId[controllersCount] = {};
          }
          this.CountByPriorityByFrameworkId[controllersCount] = item; 
        }
        console.log(this.phase);
        this.CountByPriorityByFrameworkId['total_1'] = this.CountByPriorityByFrameworkId['controllersCount_1']['controlsCount']+this.CountByPriorityByFrameworkId['controllersCount_2']['controlsCount']+this.CountByPriorityByFrameworkId['controllersCount_3']['controlsCount'];


        this.CountByPriorityByFrameworkId['total_2'] = this.CountByPriorityByFrameworkId['controllersCount_1']['percentageOfTotal']+this.CountByPriorityByFrameworkId['controllersCount_2']['percentageOfTotal']+this.CountByPriorityByFrameworkId['controllersCount_3']['percentageOfTotal'];


        this.CountByPriorityByFrameworkId['total_3'] = this.CountByPriorityByFrameworkId['controllersCount_1'][this.phase+'Count']+
                                                       this.CountByPriorityByFrameworkId['controllersCount_2'][this.phase+'Count']+
                                                       this.CountByPriorityByFrameworkId['controllersCount_3'][this.phase+'Count'];
        
        this.CountByPriorityByFrameworkId['total_4'] = this.CountByPriorityByFrameworkId['controllersCount_1'][this.phase+'Percentage']+
                                                       this.CountByPriorityByFrameworkId['controllersCount_2'][this.phase+'Percentage']+
                                                       this.CountByPriorityByFrameworkId['controllersCount_3'][this.phase+'Percentage'];
    });



    this.reportsService.getControllerByPriorityLevelByFrameworkId(this.frameWorkData.id).subscribe((r) => {
      
      this.PriorityLevelByFrameworkId = r;
      let ser = [];
      let grand_total_controllersCounts = 0;
      let grand_total_complianceCounts = 0;
      let grand_total_compliancepercentage = 0;
      for (var item of r) {
        let domains  = item['domains'];
        let priority  = item['priority'];
        let total_complianceCounts = 0;
        let total_controllersCounts = 0;
        for (var domain of domains) {
          let domainName = domain['domainName'];
          let complianceCount = domain['complianceCount'];
          let controllersCount = domain['controllersCount'];

          if(this.DomainControllersCount[domainName] == undefined){
            this.DomainControllersCount[domainName] = {};
          }

          let total_controllersCounts = this.DomainControllersCount[domainName]['total_controllersCounts']??0;
          this.DomainControllersCount[domainName]['total_controllersCounts'] = controllersCount + total_controllersCounts; 

        }
      }


      for (var item of r) {
        let domains  = item['domains'];
        let priority  = item['priority'];
        let total_complianceCounts = 0;
        let total_controllersCounts = 0;
        for (var domain of domains) {
          let domainName = domain['domainName'];
          let complianceCount = domain['complianceCount'];
          let controllersCount = domain['controllersCount'];
          
          //total_complianceCounts += complianceCount;
          //total_controllersCounts += controllersCount;
         

          if(this.PriorityLevelByFrameworkId_chartData[domainName] == undefined){
            this.PriorityLevelByFrameworkId_chartData[domainName] = {};
          }
         

          total_controllersCounts = this.DomainControllersCount[domainName]['total_controllersCounts'] ;

          let percentage = 0;
          if(total_controllersCounts != 0){
            percentage = Math.floor((controllersCount/total_controllersCounts)*100);
          }
          
          domain['percentage'] = percentage;

          this.PriorityLevelByFrameworkId_chartData[domainName][priority] = domain;

          this.PriorityLevelByFrameworkId_chartData2["percentage"]["priority_"+priority].push(percentage);

          this.PriorityLevelByFrameworkId_chartData2["priority_"+priority]['complianceCount'].push({value:complianceCount});
          this.PriorityLevelByFrameworkId_chartData2["priority_"+priority]['controllersCount'].push({value:controllersCount});
         
          let check = this.PriorityLevelByFrameworkId_chartData2["xAxisData"].includes(domainName)
          if(!check){
            this.PriorityLevelByFrameworkId_chartData2["xAxisData"].push(domainName);
          }
        }
      }

    });
    


    let xAxisData = [];
    let data1 = [];
    let data2 = [];
    let data3 = [];
    for (let i = 0; i < 10; i++) {
      xAxisData.push('Class' + i);
      data1.push({value:+(Math.random() * 2).toFixed(2),name:''});
      data2.push({value:+(Math.random() * 5).toFixed(2),name:''});
      data3.push({value:+(Math.random() + 0.3).toFixed(2),name:''});
    }


    var emphasisStyle = {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(0,0,0,0.3)'
      }
    };


    this.ChartOptions1  = {
      color: ["#acd836", "#57dcc0"],

      legend: {
        data: ['عدد ضوابط المجال', 'عدد الإمتثال'],
        left: '10%',
        right: '5%'
      },
  
      tooltip: {},
      xAxis: {
        data:   this.PriorityLevelByFrameworkId_chartData2["xAxisData"],
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false }
      },
      yAxis: {},
      grid: {
        bottom: 100
      },
      series: [
        {
          name: 'عدد ضوابط المجال',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: this.PriorityLevelByFrameworkId_chartData2["priority_1"]["controllersCount"],
          barWidth: 15,
        },
        {
          name: 'عدد الإمتثال',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: this.PriorityLevelByFrameworkId_chartData2["priority_1"]["complianceCount"],
          barWidth: 15,
        },
      
      ]
    };

    this.ChartOptions2  = {
      color: ["#acd836", "#57dcc0"],

      legend: {
        data: ['عدد ضوابط المجال', 'عدد الإمتثال'],
        left: '10%',
        right: '5%'
      },
  
      tooltip: {},
      xAxis: {
        data:   this.PriorityLevelByFrameworkId_chartData2["xAxisData"],
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false }
      },
      yAxis: {},
      grid: {
        bottom: 100
      },
      series: [
        {
          name: 'عدد ضوابط المجال',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: this.PriorityLevelByFrameworkId_chartData2["priority_2"]["controllersCount"],
          barWidth: 15,
        },
        {
          name: 'عدد الإمتثال',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: this.PriorityLevelByFrameworkId_chartData2["priority_2"]["complianceCount"],
          barWidth: 15,
        },
      
      ]
    };

    this.ChartOptions3  = {
      color: ["#acd836", "#57dcc0"],

      legend: {
        data: ['عدد ضوابط المجال', 'عدد الإمتثال'],
        left: '10%',
        right: '5%'
      },
  
      tooltip: {},
      xAxis: {
        data:   this.PriorityLevelByFrameworkId_chartData2["xAxisData"],
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false }
      },
      yAxis: {},
      grid: {
        bottom: 100
      },
      series: [
        {
          name: 'عدد ضوابط المجال',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: this.PriorityLevelByFrameworkId_chartData2["priority_3"]["controllersCount"],
          barWidth: 15,
        },
        {
          name: 'عدد الإمتثال',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: this.PriorityLevelByFrameworkId_chartData2["priority_3"]["complianceCount"],
          barWidth: 15,
        },
      
      ]
    };

    this.ChartOptions5  = {
      color: ["#528fe1","#1cae40","#57dcc0"],

      legend: {
        data: [ 'Priority (1)','Priority (2)','Priority (3)'],
        left: '10%',
        right: '5%'
      },
  
      tooltip: {},
      xAxis: {
        data: this.PriorityLevelByFrameworkId_chartData2["xAxisData"],
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false }
      },
      yAxis: {},
      grid: {
        bottom: 100
      },
      series: [
        {
          name: 'Priority (1)',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          //data: data1,
          data: this.PriorityLevelByFrameworkId_chartData2["percentage"]["priority_1"],
          barWidth: 15,
        },
        {
          name: 'Priority (2)',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: this.PriorityLevelByFrameworkId_chartData2["percentage"]["priority_2"],
          //data: data2,
          barWidth: 15,
        },
        {
          name: 'Priority (3)',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: this.PriorityLevelByFrameworkId_chartData2["percentage"]["priority_3"],
          //data: data3,
          barWidth: 15,
        },
      ]
    };
    
    this.ChartOptions4  = {
      color: ["#f20000","#fc6d80","#f3b230","#f0e929","#92d53b","#4fa765"],
      //color: ["#4fa765","#92d53b","#f0e929","#f3b230","#fc6d80","#f20000"],

      legend: {
        data: ['ﻧﺎﺿﺞ','ﻣُﻘﺎس','ﻣُﻔﻌﻞ','ﻣُﻌﺮف','أوﻟﻰ','ﻻ ﻳﻨﻄﺒﻖ'],
        //data: ['ﻻ ﻳﻨﻄﺒﻖ','أوﻟﻰ','ﻣُﻌﺮف','ﻣُﻔﻌﻞ','ﻣُﻘﺎس','ﻧﺎﺿﺞ'],
        left: '10%',
        right: '5%'
      },
  
      tooltip: {},
      xAxis: {
        data: this.ComplianceLevelByFrameworkId_chartData['xAxisData'],
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false }
      },
      yAxis: {},
      grid: {
        bottom: 100
      },
      series: [
        {
          name: 'ﻻ ﻳﻨﻄﺒﻖ',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: this.ComplianceLevelByFrameworkId_chartData['notImplemented'],
          barWidth: 15,
        },
        {
          name: 'أوﻟﻰ',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: this.ComplianceLevelByFrameworkId_chartData['intial'],
          barWidth: 15,
        },
        {
          name: 'ﻣُﻌﺮف',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: this.ComplianceLevelByFrameworkId_chartData['defined'],
          barWidth: 15,
        },
        {
          name: 'ﻣُﻔﻌﻞ',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: this.ComplianceLevelByFrameworkId_chartData['effective'],
          barWidth: 15,
        },
        {
          name: 'ﻣُﻘﺎس',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: this.ComplianceLevelByFrameworkId_chartData['measurable'],
          barWidth: 15,
        },
        {
          name: 'ﻧﺎﺿﺞ',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: this.ComplianceLevelByFrameworkId_chartData['mature'],
          barWidth: 15,
        },
      ]
    };


  }

  PhaseChanged(val){
    console.log(this.PriorityLevelByFrameworkId_chartData2);
    this.phase = val;
  }

  PriorityPhaseChanged(val){
    console.log(this.DomainControllersCount);
    this.priority_phase = val;
    this.phase_status_filter = this.priority_phase+""+this.status;
    console.log(this.phase_status_filter);

  }

  StatusChanged(val){
    console.log(this.PriorityLevelByFrameworkId_chartData);
    this.status = val.charAt(0).toUpperCase() + val.slice(1);;
    this.phase_status_filter = this.priority_phase+""+this.status;
    console.log(this.phase_status_filter);
  }


  getSum(index)  {
    let sum = 0;
    for(let i = 0; i < this.ComplianceLevelByFrameworkId.length; i++) {
      sum += this.ComplianceLevelByFrameworkId[i][index];
    }
    return sum;
  }

}
