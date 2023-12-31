import { LocalizationService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@proxy/dashboards';
import { SharedStatus } from '@proxy/shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private dashboardService:DashboardService,
    private localizationService:LocalizationService
  ) {}

  




  dashboardData;
  ngOnInit(): void {
    this.initCards();
    
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

  cards;
  complianceChartOptions;
  risksChartOptions;
  risksLevelChartOptions;
  auditsOptions;
  actionsChartOptions;
  initCards() {
    this.cards = [
      {
        title: 'SystemUsers',
        icon: 'metro-users',
        color: '#2B657D',
        key:'usersCount',
        url:'/settings/identity/users',
        queryParams:{}
      },
      {
        title: 'ActiveUsers',
        icon: 'user-check',
        color: '#1CAE40',
        key:'activeUsersCount',
        url:'/settings/identity/users',
        queryParams:{}
      },
      {
        title: 'DepartmentsCount',
        icon: 'network-wired',
        color: '#3B76B1',
        key:'departmentsCount',
        url:'/settings/department/list',
        queryParams:{}
      },
      {
        title: 'AddedFrameworksCount',
        icon: 'layer-group',
        color: '#F9CE1A',
        key:'frameworksCount',
        url:'/frameworks/list',
        queryParams:{}
      },
      {
        title: 'ActiveFrameworksCount',
        icon: 'layer-group-button',
        color: '#76F094',
        key:'activeFrameworksCount',
        url:'/frameworks/list',
        queryParams:{
          status: SharedStatus.Active
        }
      },
      {
        title: 'ComplianceAppliedFrames',
        icon: 'layer-group-check',
        color: '#2896E9',
        key:'implementedCompliantFrameworksCount',
        url:'/compliance-assessment/list',
        queryParams:{}
      },
      {
        title: 'CountOfRisks',
        icon: 'warning',
        color: '#DF1E39',
        key:'risksCount',
        url:'/risks-management/riskopportunity',
        queryParams:{}
      },
      {
        title: 'TakenActions',
        icon: 'th-list',
        color: '#7467F0',
        key:'actionsCount',
        url:'/risks-management/riskopportunity',
        queryParams:{}
      },
      {
        title: 'AuditsCount',
        icon: 'tasks',
        color: '#36D1DC',
        key:'auditsCount',
        url:'/internal-audit/audit-setup/list',
        queryParams:{}
      },
    ];
  
    this.complianceChartOptions = {
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
            { value: 0, name: this.localizationService.instant('::NonComply'), itemStyle: { color: '#FE5957' } },
            { value: 0, name: this.localizationService.instant('::Comply'), itemStyle: { color: '#12A751' } },
            { value: 0, name: this.localizationService.instant('::PartiallyComply'), itemStyle: { color: '#FAB800' } },
          ],
        },
      ],
    };
  
    this.risksChartOptions  = {
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
            { value: 0, name: this.localizationService.instant('::Opened'), itemStyle: { color: '#12A751' } },
            { value: 0, name: this.localizationService.instant('::Closed'), itemStyle: { color: '#8D8D8D' } },
            { value: 0, name: this.localizationService.instant('::UnderReview'), itemStyle: { color: '#1C6BD4' } },
          ],
        },
      ],
    };
  
    this.risksLevelChartOptions  = {
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
            { value: 0, name: this.localizationService.instant('::high'), itemStyle: { color: '#CC334C' } },
            { value: 0, name: this.localizationService.instant('::medium'), itemStyle: { color: '#FAB800' } },
            { value: 0, name: this.localizationService.instant('::low'), itemStyle: { color: '#12A751' } },
          ],
        },
      ],
    };
  
    this.auditsOptions  = {
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
            { value: 0, name: this.localizationService.instant('::InPreparation'), itemStyle: { color: '#8D8D8D' } },
            { value: 0, name: this.localizationService.instant('::UnderExecution'), itemStyle: { color: '#1C6BD4' } },
            { value: 0, name: this.localizationService.instant('::Completed'), itemStyle: { color: '#12A751' } },
            { value: 0, name: this.localizationService.instant('::Late'), itemStyle: { color: '#CC334C' } },
          ],
        },
      ],
    };
  
    this.actionsChartOptions = {
      xAxis: {
        type: 'category',
        data: [this.localizationService.instant('::NotStarted'), this.localizationService.instant('::UnderExecution'), this.localizationService.instant('::Completed') , this.localizationService.instant('::Late')]
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
  }
}


