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


}
