import { LocalizationService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '@proxy/departments';
import { RiskAndOpportunityService } from '@proxy/RiskAndOpportunity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  potentials = [1,2,4,8,12];
  constructor(
    private localizationService:LocalizationService,
    private riskAndOpportunityService:RiskAndOpportunityService,
    private departmentService:DepartmentService,
  ) { }

  departments = {};
  likelihoodConditions;

  ngOnInit(): void {
    this.likelihoodConditions = [
      {
        value: this.localizationService.instant('::VeryLow'),
        itemStyle:{
          color:'#03a008'
        }
      },
      {
        value: this.localizationService.instant('::Low'),
        itemStyle:{
          color:'#26872a'
        }
      },
      {
        value: this.localizationService.instant('::Medium'),
        itemStyle:{
          color:'#efe338'
        }
      },
      {
        value: this.localizationService.instant('::High'),
        itemStyle:{
          color:'#f3a108'
        }
     },
      {
        value: this.localizationService.instant('::VeryHigh'),
        itemStyle:{
          color:'#b62e2e'
        }
      },
    ];

    this.departmentService.getList({search:null, maxResultCount:null }).subscribe(r => {
      this.getListRisks();
      this.getListOpportunities();
      r.items.map(item => {
        this.departments[item.id] = item;
      });
    });

    this.riskAndOpportunityService.getOpenClose({ search:'', type:1,DepartmentId:null,UserId:null,Potential:null,Status:null, maxResultCount:null })
    .subscribe((response) => {
      this.risksChart = this.createRisksOppChart(response.Open,response.Close,'::Status');
    });

    this.riskAndOpportunityService.getOpenClose({ search:'', type:2,DepartmentId:null,UserId:null,Potential:null,Status:null, maxResultCount:null }).subscribe((response) => {
      this.opportunitiesChart = this.createRisksOppChart(response.Open,response.Close,'::Status');
    });

    this.riskAndOpportunityService.getTreatmentsDashboard({ search:'', type:1,DepartmentId:null,UserId:null,Potential:null,Status:null, maxResultCount:null })
    .subscribe((response) => {
      this.treatmentRisksChart = this.TreatementRisksOppChart(response.treatmentRisks,response.NotreatmentRisks,'::TreatmentsStatus');
    });

    this.riskAndOpportunityService.getTreatmentsDashboard({ search:'', type:2,DepartmentId:null,UserId:null,Potential:null,Status:null, maxResultCount:null })
    .subscribe((response) => {
      this.treatmentOpportunitiesChart = this.TreatementRisksOppChart(response.treatmentRisks,response.NotreatmentRisks,'::TreatmentsStatus');
    });
  }

  onChartClick(ev){
    console.log(ev);
    // + '?=name' + encodeURI(ev.name)
    window.open('/risks-management/dashboard-report' + ev.data.groupId  , "_blank");
  }

  itemsRisk;
  totalCountRisk;

  risksChart;
  treatmentRisksChart;
  AfterTreatmentRiskBarsPotentials;
  
  getListRisks() {
    this.riskAndOpportunityService.getList({ search: '', type:1,DepartmentId:null,UserId:null,Potential:null,Status:null, maxResultCount:null }).subscribe((response) => {
      this.itemsRisk = response.items;
      this.totalCountRisk = response.totalCount;

      let riskitem = [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }]
      let reEvaluationitem = [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }];

      response.items.map(x => {
        if(x['reEvaluation'] == null) {
          if(x['potential'] == 1)                               riskitem[0].value += 1;
          else if(x['potential'] == 2 || x['potential'] == 3)   riskitem[1].value += 1;
          else if(x['potential'] == 4 || x['potential'] == 6)   riskitem[2].value += 1;
          else if(x['potential'] == 8)                          riskitem[3].value += 1;
          else if(x['potential'] == 12 || x['potential'] == 16) riskitem[4].value += 1;
        } else {
          if(x['reEvaluation'] == 1) reEvaluationitem[0].value += 1;
          else if(x['reEvaluation'] == 2) reEvaluationitem[1].value += 1;
          else if(x['reEvaluation'] == 4) reEvaluationitem[2].value += 1;
          else if(x['reEvaluation'] == 8) reEvaluationitem[3].value += 1;
          else if(x['reEvaluation'] == 12) reEvaluationitem[4].value += 1;
        }
      });

      this.createChartPotentialBars('riskBarsPotentials', this.likelihoodConditions ,riskitem, '::Risk:Potential');
      this.createChartPotentialBars('AfterTreatmentRiskBarsPotentials', this.likelihoodConditions ,reEvaluationitem, '::Risk:Potential');

      let risksByDepartments = {};
      for(let item of response.items) {
        if(risksByDepartments[item['departmentId']]) risksByDepartments[item['departmentId']].items.push(item);
        else risksByDepartments[item['departmentId']] = {
          items:[item],
          name:this.departments[item['departmentId']].name,
          id:'/1/'+this.departments[item['departmentId']].id
        };
      }
      this.createChartBars('riskBarsOptions',risksByDepartments, '::RisksInDepartments')
    });
  }
  riskBarsPotentials;
  riskBarsOptions;
  opportunitiesBarsOptions;
  createChartBars(key, departments, title ) {
    let names  = [],
        values = [];
    for(let key in departments) {
      names.push({
        value:departments[key].name,
      });
      values.push({
        value:departments[key].items.length,
        groupId:departments[key].id
      })
    }

    this[key] = {
      title: {
        text: this.localizationService.instant(title),
        left: 'center',
        top: 10,
        textStyle: {
          color: '#000000',
          fontSize:'16px',
          fontWeight:'bold',
          fontFamily:this.fontFamily,
        }
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true }
        }
      },
      legend: {
        left: 'center',
        bottom:'0%'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: names
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: values,
          type: 'bar',
          barWidth:40
        }
      ]
    };

  }
  createChartPotentialBars(key, PotentialName,PotentialValue, title ) {
    let names  = [],
        values = [];
    for(let i = 0; i < PotentialValue.length; i++) {
      values.push({
        value:PotentialValue[i].value,
        itemStyle:PotentialName[i].itemStyle
      })
    }
   
    for(let key in PotentialName) {
      names.push(this.localizationService.instant(PotentialName[key].value));
    }

    this[key] = {
      title: {
        text: this.localizationService.instant(title),
        left: 'center',
        top: 10,
        textStyle: {
          color: '#000000',
          fontSize:'16px',
          fontWeight:'bold',
          fontFamily:this.fontFamily,
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
      xAxis: {
        type: 'category',
        data: names
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: values,
          type: 'bar',
          barWidth:40
        }
      ]
    };

  }

  itemsOpportunity;
  totalCountOpportunity;
  opportunitiesChart;
  treatmentOpportunitiesChart;
  riskBarsOpportunityPotentials;
  AfterTreatmentRiskBarsOpportunityPotentials
  getListOpportunities() {
    this.riskAndOpportunityService.getList({  search: '', type:2,DepartmentId:null,UserId:null,Potential:null,Status:null,  maxResultCount:null }).subscribe((response) => {
      this.itemsOpportunity = response.items;
      this.totalCountOpportunity = response.totalCount;

      let riskitem = [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }];
      let reEvaluationitem = [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }];

      response.items.map(x => {
        if(x['reEvaluation'] == null) {
          if(x['potential'] == 1)                               riskitem[0].value += 1;
          else if(x['potential'] == 2 || x['potential'] == 3)   riskitem[1].value += 1;
          else if(x['potential'] == 4 || x['potential'] == 6)   riskitem[2].value += 1;
          else if(x['potential'] == 8)                          riskitem[3].value += 1;
          else if(x['potential'] == 12 || x['potential'] == 16) riskitem[4].value += 1;
        } else {
          if(x['reEvaluation'] == 1) reEvaluationitem[0].value += 1;
          else if(x['reEvaluation'] == 2) reEvaluationitem[1].value += 1;
          else if(x['reEvaluation'] == 4) reEvaluationitem[2].value += 1;
          else if(x['reEvaluation'] == 8) reEvaluationitem[3].value += 1;
          else if(x['reEvaluation'] == 12) reEvaluationitem[4].value += 1;

        }
      });


      this.createChartPotentialBars('riskBarsOpportunityPotentials', this.likelihoodConditions ,riskitem, '::Opportunity:Potential');
      this.createChartPotentialBars('AfterTreatmentRiskBarsOpportunityPotentials', this.likelihoodConditions ,reEvaluationitem, '::Opportunity:Potential');


      let oppByDepartments = {};
      for(let item of response.items) {
        if(oppByDepartments[item['departmentId']]) oppByDepartments[item['departmentId']].items.push(item);
        else oppByDepartments[item['departmentId']] = {
          items:[item],
          name:this.departments[item['departmentId']].name,
          id:'/2/'+this.departments[item['departmentId']].id
        };
      }
      this.createChartBars('opportunitiesBarsOptions', oppByDepartments, '::OpportunitiesInDepartments')
    });
  }

  fontFamily = 'ElMessiri, Roboto, Helvetica Neue,  sans-serif';

  createRisksOppChart(opened,closed, title) {
    return {
      title: {
          text: this.localizationService.instant(title),
          // subtext: '',
          left: 'center',
          textStyle:{
            fontFamily:this.fontFamily
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)',
          textStyle:{
            fontFamily:this.fontFamily
          }
        },
        legend: {
          bottom: 0,
          left: 'center',
          data: [this.localizationService.instant('::Status:Open'), this.localizationService.instant('::Status:Close')],
          textStyle:{
            fontFamily:this.fontFamily
          }
        },
        series: [
          {
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
              {
                value: opened,
                name: this.localizationService.instant('::Status:Open'),
                itemStyle:{
                 color:'#32ba94'
                }
              },
              {
                value: closed,
                name: this.localizationService.instant('::Status:Close'),
                itemStyle: {
                 color:'red'
                },
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 20,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
           label: {
              formatter: '{b}  \n \n {d}%',
              // position: 'inside',
              fontSize:12,
              fontWeight:'bold',
              fontFamily:this.fontFamily,
              // overflow:'break',
              // position :'outer',
              // alignTo: 'none',
            },
          }
        ]
    }
  }


  TreatementRisksOppChart(Treatement,TreatementNo, title) {
    return {
      title: {
          text: this.localizationService.instant(title),
          left: 'center',
          textStyle:{
            fontFamily:this.fontFamily
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)',
          textStyle:{
            fontFamily:this.fontFamily
          }
        },
        legend: {
          bottom: 0,
          left: 'center',
          data: [this.localizationService.instant('::Status:Treatement'), this.localizationService.instant('::Status:TreatementNo')],
          textStyle:{
            fontFamily:this.fontFamily
          }
        },
        series: [
          {
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
              {
                value: Treatement,
                name: this.localizationService.instant('::Status:Treatement'),
                itemStyle:{
                 color:getComputedStyle(document.body).getPropertyValue('--main-color')
                }
              },
              {
                value: TreatementNo,
                name: this.localizationService.instant('::Status:TreatementNo'),
                itemStyle: {
                 color:'#90caf9'
                },
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 20,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
           label: {
              formatter: '{b}  \n \n {d}%',
              // position: 'inside',
              fontSize:12,
              fontWeight:'bold',
              fontFamily:this.fontFamily
            },
          }
        ]
    }
  }

}




