import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setChartOneOptions();
    this.setChartTwoOptions();
    this.setChartThreeOptions();
    this.setchartFourOptions();
    this.setChartFiveOptions();

    this.setChartSixOptions();
    this.setChartSevenOptions();
  }

  chartOneOptions
  setChartOneOptions() {
    this.chartOneOptions = {
      title: {
        text: 'Total Requirements Maturity Level',
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
          name: 'Initial',
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
          name: 'Managed',
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
          name: 'Defined',
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
          name: 'Quantitatively Managed',
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
          name: 'Optimizing',
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
        text: 'Total Requirements',
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
          name: 'Total Requirements',
          type: 'pie',
          // radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 40, name: 'Initial' },
            { value: 38, name: 'Managed' },
            { value: 32, name: 'Defined' },
            { value: 30, name: 'Quantitatively Managed' },
            { value: 28, name: 'Optimizing' },
          ]
        }
      ]
    };
  }
 

  chartThreeOptions
  setChartThreeOptions() {
    this.chartThreeOptions = {
      title: {
        text: 'Cybersecurity Governance ',
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
          name: 'Cybersecurity Governance ',
          type: 'pie',
          // radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 40, name: 'Initial' },
            { value: 38, name: 'Managed' },
            { value: 32, name: 'Defined' },
            { value: 30, name: 'Quantitatively Managed' },
            { value: 28, name: 'Optimizing' },
          ]
        }
      ]
    };
  }

  chartFourOptions
  setchartFourOptions() {
    this.chartFourOptions = { 
      legend: {
        data: ['Recommended Level', 'As Is Status'],
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
          { name: 'Cybersecurity Governance', max: 100 },
          { name: 'Industrial Control Systems Cybersecurity', max: 100 },
          { name: 'Third-Party and Cloud Computing Cybersecurity', max: 100 },
          { name: 'Cybersecurity Resilience', max: 100 },
          { name: 'Cybersecurity Defense', max: 100 },
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
              name: 'Recommended Level'
            },
            {
              value: [60, 0, 50, 20, 40],
              name: 'As Is Status',
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
            value:'Cybersecurity Defense',
            textStyle:{
              fontSize:11
            }
          },
          {
            value:'Cybersecurity Resilience',
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
            value:'Industrial Control Systems Cybersecurity',
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
          name: 'As Is Status',
          type: 'bar',
          barGap: 0,
          itemStyle: {
            color: '#C10000'
          },
         
          data: [59, 37, 20, 54, 0]
        },
        {
          name: 'Recommended Level',
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
        text: 'Cybersecurity Resilience',
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
          name: 'Cybersecurity Governance ',
          type: 'pie',
          // radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 0, name: 'Initial' },
            { value: 6, name: 'Managed' },
            { value: 0, name: 'Defined' },
            { value: 0, name: 'Quantitatively Managed' },
            { value: 0, name: 'Optimizing' },
          ]
        }
      ]
    };
  }

  
  chartSevenOptions
  setChartSevenOptions() {
    this.chartSevenOptions = {
      title: {
        text: 'Cybersecurity Defense',
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
          name: 'Total Requirements',
          type: 'pie',
          // radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 56, name: 'Initial' },
            { value: 12, name: 'Managed' },
            { value: 42, name: 'Defined' },
            { value: 0, name: 'Quantitatively Managed' },
            { value: 20, name: 'Optimizing' },
          ]
        }
      ]
    };
  }


  chartEightOptions
  setChartEightOptions() {
    this.chartEightOptions = {
      title: {
        text: 'Third-Party and Cloud Computing Cybersecurity',
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
          name: 'Total Requirements',
          type: 'pie',
          // radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 0, name: 'Initial' },
            { value: 2, name: 'Managed' },
            { value: 11, name: 'Defined' },
            { value: 0, name: 'Quantitatively Managed' },
            { value: 0, name: 'Optimizing' },
          ]
        }
      ]
    };
  }

  
 

}
