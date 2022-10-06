import { LocalizationService } from '@abp/ng.core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DepartmentService } from '@proxy/departments';
import { RiskAndOpportunityService } from '@proxy/RiskAndOpportunity';

@Component({
  selector: 'app-risks-opports',
  templateUrl: './risks-opports.component.html',
  styleUrls: ['./risks-opports.component.scss'],
})
export class RisksOpportsComponent implements OnInit {
  @Output('printEle') printEle = new EventEmitter();

  potentials = [1,2,4,8,12];
  constructor(
    private localizationService:LocalizationService,
    private riskAndOpportunityService:RiskAndOpportunityService,
    private departmentService:DepartmentService,
  ) { }

  departments = {};
  likelihoodConditions;

  ngOnInit(): void {



    this.riskAndOpportunityService.getmitigation({ search:'', type:1,DepartmentId:null,UserId:null,Potential:null,Status:null, maxResultCount:null })
    .subscribe((response) => {
      console.log(response);
    });
    this.likelihoodConditions = [
      {
        value: this.localizationService.instant('::VeryLow'),
        itemStyle:{
          color:'#03a008'
        },
        id:'VeryLow'
      },
      {
        value: this.localizationService.instant('::Low'),
        itemStyle:{
          color:'#26872a'
        },
        id:'Low'
      },
      {
        value: this.localizationService.instant('::Medium'),
        itemStyle:{
          color:'#efe338'
        },
        id:'Medium'
      },
      {
        value: this.localizationService.instant('::High'),
        itemStyle:{
          color:'#f3a108'
        },
        id:'High'
     },
      {
        value: this.localizationService.instant('::VeryHigh'),
        itemStyle:{
          color:'#b62e2e'
        },
        id:'VeryHigh'
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

      /*
      
       { id: 1, value: 0, name:'VeryLow' },
      { id: 2, value: 3, name:'Low' },
      { id: 6, value: 4, name: 'Medium' },
      { id: 9, value: 8, name: 'High' },
      { id: 12, value: 16, name: 'VeryHigh' },
      */

      let riskitem = [{ value: 0, id:'1_0' }, { value: 0, id:'2_3' }, { value: 0, id:'6_4' }, { value: 0, id:'9_8' }, { value: 0, id:'12_16' }]
      let reEvaluationitem = [{ value: 0, id:'1' }, { value: 0, id:'2' }, { value: 0, id:'4' }, { value: 0, id:'8' }, { value: 0, id:'12' }];
      response.items.map(x => {
        if(x['reEvaluation'] == null) {
          if(x['potential'] == 1)                               riskitem[0].value += 1;
          else if(x['potential'] == 2 || x['potential'] == 3)   riskitem[1].value += 1;
          else if(x['potential'] == 4 || x['potential'] == 6)   riskitem[2].value += 1;
          else if(x['potential'] == 8 || x['potential'] == 9)   riskitem[3].value += 1;
          else if(x['potential'] == 12 || x['potential'] == 16) riskitem[4].value += 1;
        } else {
          if(x['reEvaluation'] == 1)       reEvaluationitem[0].value += 1;
          else if(x['reEvaluation'] == 2)  reEvaluationitem[1].value += 1;
          else if(x['reEvaluation'] == 4)  reEvaluationitem[2].value += 1;
          else if(x['reEvaluation'] == 8)  reEvaluationitem[3].value += 1;
          else if(x['reEvaluation'] == 12) reEvaluationitem[4].value += 1;
        }
      });

      this.createChartPotentialBars('riskBarsPotentials' , riskitem, '::Risk:Potential',1 , 'BeforeMitigation');
      this.createChartPotentialBars('AfterTreatmentRiskBarsPotentials' ,reEvaluationitem, '::Risk:Potential', 1 , 'AfterMitigation');

      let risksByDepartments = {};
      for(let item of response.items) {
        if(risksByDepartments[item['departmentId']]) risksByDepartments[item['departmentId']].items.push(item);
        else risksByDepartments[item['departmentId']] = {
          items:[item],
          name:this.departments[item['departmentId']].name,
          id:'/1/department/'+this.departments[item['departmentId']].id
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
  createChartPotentialBars(key,PotentialValue, title, type, period ) {
    let names  = [],
        values = [];
    for(let i = 0; i < PotentialValue.length; i++) {
      values.push({
        value:PotentialValue[i].value,
        itemStyle:this.likelihoodConditions[i].itemStyle,
        groupId:`/${type}/${PotentialValue[i].id}/${period}`
      })
    }

    for(let key in this.likelihoodConditions) {
      names.push(this.localizationService.instant(this.likelihoodConditions[key].value));
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

      let riskitem = [{ value: 0, id:'1_0' }, { value: 0, id:'2_3' }, { value: 0, id:'6_4' }, { value: 0, id:'9_8' }, { value: 0, id:'12_16' }]
      let reEvaluationitem = [{ value: 0, id:'1' }, { value: 0, id:'2' }, { value: 0, id:'4' }, { value: 0, id:'8' }, { value: 0, id:'12' }];
      // let reEvaluationitem = [{ value: 0, id:1, val:0 }, { value: 0, id:2, val:3 }, { value: 0, id:6, val:4 }, { value: 0, id:9, val:8 }, { value: 0, id:12, val:16 }];

      response.items.map(x => {
        if(x['reEvaluation'] == null) {
          if(x['potential'] == 1)                               riskitem[0].value += 1;
          else if(x['potential'] == 2  || x['potential'] == 3)   riskitem[1].value += 1;
          else if(x['potential'] == 4  || x['potential'] == 6)   riskitem[2].value += 1;
          else if(x['potential'] == 8  || x['potential'] == 9)                          riskitem[3].value += 1;
          else if(x['potential'] == 12 || x['potential'] == 16) riskitem[4].value += 1;
        } else {
          if(x['reEvaluation'] == 1) reEvaluationitem[0].value += 1;
          else if(x['reEvaluation'] == 2) reEvaluationitem[1].value += 1;
          else if(x['reEvaluation'] == 4) reEvaluationitem[2].value += 1;
          else if(x['reEvaluation'] == 8) reEvaluationitem[3].value += 1;
          else if(x['reEvaluation'] == 12) reEvaluationitem[4].value += 1;
        }
      });
      this.createChartPotentialBars('riskBarsOpportunityPotentials' ,riskitem, '::Opportunity:Potential', 2, 'BeforeMitigation');
      this.createChartPotentialBars('AfterTreatmentRiskBarsOpportunityPotentials' ,reEvaluationitem, '::Opportunity:Potential',2, 'AfterMitigation');
      let oppByDepartments = {};
      for(let item of response.items) {
        if(oppByDepartments[item['departmentId']]) oppByDepartments[item['departmentId']].items.push(item);
        else oppByDepartments[item['departmentId']] = {
          items:[item],
          name:this.departments[item['departmentId']].name,
          id:'/2/department/'+this.departments[item['departmentId']].id
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
      this.printEle.emit(document.getElementsByClassName('print-section-2')[0].innerHTML);
    }, 100)
  }

}
