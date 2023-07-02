import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frame-report',
  templateUrl: './frame-report.component.html',
  styleUrls: ['./frame-report.component.scss']
})
export class FrameReportComponent implements OnInit {
  activeSubTab = 'statistics';
  ChartOptions1;
  ChartOptions2;
  ChartOptions3;
  ChartOptions4;
  
  constructor() { }

  ngOnInit(): void {
    let xAxisData = [];
    let data1 = [];
    let data2 = [];
    let data3 = [];
    for (let i = 0; i < 10; i++) {
      xAxisData.push('Class' + i);
      data1.push({value:+(Math.random() * 2).toFixed(2),name:'dasdasd'});
      data2.push({value:+(Math.random() * 5).toFixed(2),name:'dasdasd'});
      data3.push({value:+(Math.random() + 0.3).toFixed(2),name:'dasdasd'});
      //data4.push(+Math.random().toFixed(2));
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
    
    this.ChartOptions4  = {
      color: ["#f20000","#fc6d80","#f3b230","#f0e929","#92d53b","#4fa765"],
      //color: ["#4fa765","#92d53b","#f0e929","#f3b230","#fc6d80","#f20000"],

      legend: {
        //data: ['ﻧﺎﺿﺞ','ﻣُﻘﺎس','ﻣُﻔﻌﻞ','ﻣُﻌﺮف','أوﻟﻰ','ﻻ ﻳﻨﻄﺒﻖ'],
        data: ['ﻻ ﻳﻨﻄﺒﻖ','أوﻟﻰ','ﻣُﻌﺮف','ﻣُﻔﻌﻞ','ﻣُﻘﺎس','ﻧﺎﺿﺞ'],
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
          name: 'ﻧﺎﺿﺞ',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data1,
          barWidth: 15,
        },
        {
          name: 'ﻣُﻘﺎس',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
        {
          name: 'ﻣُﻔﻌﻞ',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
        {
          name: 'ﻣُﻌﺮف',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
        {
          name: 'أوﻟﻰ',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
        {
          name: 'ﻻ ﻳﻨﻄﺒﻖ',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
      ]
    };
   /*  this.the_options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Email',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Union Ads',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ads',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'Search Engine',
          type: 'bar',
          data: [862, 1018, 964, 1026, 1679, 1600, 1570],
          emphasis: {
            focus: 'series'
          },
          markLine: {
            lineStyle: {
              type: 'dashed'
            },
            data: [[{ type: 'min' }, { type: 'max' }]]
          }
        },
        {
          name: 'Baidu',
          type: 'bar',
          barWidth: 5,
          stack: 'Search Engine',
          emphasis: {
            focus: 'series'
          },
          data: [620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
          name: 'Google',
          type: 'bar',
          stack: 'Search Engine',
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 290, 230, 220]
        },
        {
          name: 'Bing',
          type: 'bar',
          stack: 'Search Engine',
          emphasis: {
            focus: 'series'
          },
          data: [60, 72, 71, 74, 190, 130, 110]
        },
        {
          name: 'Others',
          type: 'bar',
          stack: 'Search Engine',
          emphasis: {
            focus: 'series'
          },
          data: [62, 82, 91, 84, 109, 110, 120]
        }
      ]
    }; */
  }

}
