import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@proxy/dashboards';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cards = [
    {
      title: 'المستخدمين على النظام',
      icon: 'metro-users',
      color: '#2B657D',
      key:'usersCount'
    },
    {
      title: 'المستخدمين الفعالين',
      icon: 'user-check',
      color: '#1CAE40',
      key:'activeUsersCount'
    },
    {
      title: 'عدد الإدارات',
      icon: 'network-wired',
      color: '#3B76B1',
      key:'departmentsCount'
    },
    {
      title: 'عدد الإطارات المضافة',
      icon: 'layer-group',
      color: '#F9CE1A',
      key:'frameworksCount'
    },
    {
      title: 'عدد الإطارات الفعالة',
      icon: 'layer-group-button',
      color: '#76F094',
      key:'activeFrameworksCount'
    },
    {
      title: 'إطارات طُبق الامتثال عليها',
      icon: 'layer-group-check',
      color: '#2896E9',
      key:'implementedCompliantFrameworksCount'
    },
    {
      title: 'عدد المخاطر',
      icon: 'warning',
      color: '#DF1E39',
      key:'risksCount'
    },
    {
      title: 'الأفعال المتخذة على النظام',
      icon: 'th-list',
      color: '#7467F0',
      key:'actionsCount'
    },
    {
      title: 'عدد التدقيقات',
      icon: 'tasks',
      color: '#36D1DC',
      key:'auditsCount'
    },
  ];

  complianceChartOptions = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily:'ElMessiri, Roboto, Helvetica Neue,  sans-serif'
          },
        },
        data: [
          { value: 0, name: 'غير ممتثل', itemStyle: { color: '#FE5957' } },
          { value: 0, name: 'ممتثل', itemStyle: { color: '#12A751' } },
          { value: 0, name: 'ممتثل جزئي', itemStyle: { color: '#FAB800' } },
        ],
      },
    ],
  };

  risksChartOptions  = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily:'ElMessiri, Roboto, Helvetica Neue,  sans-serif'
          },
        },
        data: [
          { value: 0, name: 'مفتوحة', itemStyle: { color: '#12A751' } },
          { value: 0, name: 'مغلقة', itemStyle: { color: '#8D8D8D' } },
          { value: 0, name: 'قيد المراجعة', itemStyle: { color: '#1C6BD4' } },
        ],
      },
    ],
  };

  risksLevelChartOptions  = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily:'ElMessiri, Roboto, Helvetica Neue,  sans-serif'
          },
        },
        data: [
          { value: 0, name: 'مرتفعة', itemStyle: { color: '#CC334C' } },
          { value: 0, name: 'متوسطة', itemStyle: { color: '#FAB800' } },
          { value: 0, name: 'منخفضة', itemStyle: { color: '#12A751' } },
        ],
      },
    ],
  };

  auditsOptions  = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily:'ElMessiri, Roboto, Helvetica Neue,  sans-serif'
          },
        },
        data: [
          { value: 0, name: 'قيد الإعداد', itemStyle: { color: '#8D8D8D' } },
          { value: 0, name: 'قيد التنفيذ', itemStyle: { color: '#1C6BD4' } },
          { value: 0, name: 'تمت', itemStyle: { color: '#12A751' } },
          { value: 0, name: 'متأخرة', itemStyle: { color: '#CC334C' } },
        ],
      },
    ],
  };

  actionsChartOptions = {
    xAxis: {
      type: 'category',
      data: ['لم تبدأ', 'قيد التنفيذ', 'تمت' , 'متأخرة']
    },
    yAxis: {
      type: 'value'
    },
    barWidth:32,
    tooltip:{},
    series: [
      {
        data: [
          {
           value: 0,
            itemStyle: {
              color: '#8D8D8D',
              borderRadius:4
            }
          },
          {
            value: 0,
            itemStyle: {
              color: '#005CAC',
              borderRadius:4
            }
          },
          {
            value: 0,
            itemStyle: {
              color: '#1CAE40',
              borderRadius:4
            }
          },
          {
            value: 0,
            itemStyle: {
              color: '#FE5957',
              borderRadius:4
            }
          },
        ],
        type: 'bar'
      }
    ]
  };


  constructor(
    private dashboardService:DashboardService
  ) {}

  dashboardData;
  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe(r => {
      console.log(r);
      this.dashboardData = r;

      let compliantCount = 0,
          notCompliantCount = 0,
          partialCompliantCount = 0;
      r.frameworkCompliancePercentage.map(x => {
        compliantCount += x.compliantCount;
        notCompliantCount += x.notCompliantCount;
        partialCompliantCount += x.partialCompliantCount;
      });

      this.complianceChartOptions.series[0].data[0].value = notCompliantCount;
      this.complianceChartOptions.series[0].data[1].value = compliantCount;
      this.complianceChartOptions.series[0].data[2].value = partialCompliantCount;

      

      this.risksChartOptions.series[0].data[0].value = r.risksDto.openRisksCount;
      this.risksChartOptions.series[0].data[1].value = r.risksDto.closedRisksCount;
      this.risksChartOptions.series[0].data[2].value = r.risksDto.underRevisionRisksCount;


      this.risksLevelChartOptions.series[0].data[0].value = r.risksLevelDto.highCount;
      this.risksLevelChartOptions.series[0].data[1].value = r.risksLevelDto.mediumCount;
      this.risksLevelChartOptions.series[0].data[2].value = r.risksLevelDto.lowCount;

    

      this.auditsOptions.series[0].data[0].value = r.auditsDto.underPreparationAuditsCount;
      this.auditsOptions.series[0].data[1].value = r.auditsDto.underExecutionAuditsCount;
      this.auditsOptions.series[0].data[2].value = r.auditsDto.doneAuditsCount;
      this.auditsOptions.series[0].data[3].value = r.auditsDto.lateAuditsCount;


      this.actionsChartOptions.series[0].data[0].value = r.actionsDto.notStartedActionsCount;
      this.actionsChartOptions.series[0].data[1].value = r.actionsDto.inProgressActionsCount;
      this.actionsChartOptions.series[0].data[2].value = r.actionsDto.doneActionsCount;
      this.actionsChartOptions.series[0].data[3].value = r.actionsDto.lateActionsCount;
    })
  }
}


