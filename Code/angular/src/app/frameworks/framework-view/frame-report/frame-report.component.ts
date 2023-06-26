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

  ngOnInit(): void {

    //console.log(this.frameWorkData);

    this.reportsService.getControllersByComplianceLevelByFrameworkId(this.frameWorkData.id).subscribe((r) => {
      this.ComplianceLevelByFrameworkId = r;
      for (var item of r) {
        Object.keys(item).forEach(key => {
            let fsdf = item[key];
            if(this.ComplianceLevelByFrameworkId_chartData[key] != undefined){
              this.ComplianceLevelByFrameworkId_chartData[key].push({value:fsdf,name:key});
            }
        });
        this.ComplianceLevelByFrameworkId_chartData['xAxisData'].push(item['domainName']);
      }
    });

    this.reportsService.getControllersByPhaseByFrameworkId(this.frameWorkData.id).subscribe((r) => {
      this.PhaseByFrameworkId = r;
    });



    let xAxisData = [];
    let data1 = [];
    let data2 = [];
    let data3 = [];
    for (let i = 0; i < 10; i++) {
      xAxisData.push('Class' + i);
      data1.push({value:+(Math.random() * 2).toFixed(2),name:'dasdasd'});
      data2.push({value:+(Math.random() * 5).toFixed(2),name:'dasdasd'});
      data3.push({value:+(Math.random() + 0.3).toFixed(2),name:'dasdasd'});
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
        data: xAxisData,
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
          data: data1,
          barWidth: 15,
        },
        {
          name: 'عدد الإمتثال',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
      
      ]
    };

    this.ChartOptions2  = {
      color: ["#528fe1","#acd836"],

      legend: {
        data: [ 'عدد الإمتثال','عدد ضوابط المجال'],
        left: '10%',
        right: '5%'
      },
  
      tooltip: {},
      xAxis: {
        data: xAxisData,
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
          name: 'عدد الإمتثال',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data1,
          barWidth: 15,
        },
        {
          name: 'عدد ضوابط المجال',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
      
      ]
    };

    this.ChartOptions3  = {
      color: ["#528fe1","#1cae40","#57dcc0"],

      legend: {
        data: [ 'Priority (1)','Priority (2)','Priority (3)'],
        left: '10%',
        right: '5%'
      },
  
      tooltip: {},
      xAxis: {
        data: xAxisData,
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
          data: data1,
          barWidth: 15,
        },
        {
          name: 'Priority (2)',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
        {
          name: 'Priority (3)',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
      ]
    };
    
    console.log(this.ComplianceLevelByFrameworkId_chartData);

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


  getSum(index)  {
    let sum = 0;
    for(let i = 0; i < this.ComplianceLevelByFrameworkId.length; i++) {
      sum += this.ComplianceLevelByFrameworkId[i][index];
    }
    return sum;
  }

}
