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
  fontFamily = 'ElMessiri, Roboto, Helvetica Neue,  sans-serif';

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
      r.items.map(item => {
        this.departments[item.id] = item;
      });
      
      this.getItemsByStatus(1,'risks')
      this.getItemsByStatus(2,'opportunities')
    });
  }



  risksStatusChart;
  opportunitiesStatusChart;
  getItemsByStatus(type = 1, key) {
    this.riskAndOpportunityService.getOpenClose({ search:'', type,DepartmentId:null,UserId:null,Potential:null,Status:null, maxResultCount:null })
    .subscribe((response) => {
      this[key + 'StatusChart'] = this.createStatusChart(response.Open, response.Close,'::Status');
      this.getItemsByTreatment(type, key);
    });
  }

  risksTreatmentChart;
  opportunitiesTreatmentChart;
  getItemsByTreatment(type, key) {
    this.riskAndOpportunityService.getTreatmentsDashboard({ search:'', type,DepartmentId:null,UserId:null,Potential:null,Status:null, maxResultCount:null })
    .subscribe((response) => {
      this[key + 'TreatmentChart'] = this.CreateTreatementChart(response.treatmentRisks,response.NotreatmentRisks,'::TreatmentsStatus');
      this.getItemsByDepartment(type, key);
    });
  }

  risksDepartmentChart;
  opportunitiesDepartmentChart;
  getItemsByDepartment(type, key) {
    this.riskAndOpportunityService.getList({ search: '', type,DepartmentId:null,UserId:null,Potential:null,Status:null, maxResultCount:null }).subscribe((response) => {
      let itemsByDepartment = {};
      for(let item of response.items) {
        if(itemsByDepartment[item['departmentId']]) itemsByDepartment[item['departmentId']].items.push(item);
        else itemsByDepartment[item['departmentId']] = {
          items:[item],
          name:this.departments[item['departmentId']].name,
          id:'/' + type + '/department/'+this.departments[item['departmentId']].id
        };
      }
      this.createDepartmentChart(key + 'DepartmentChart' , itemsByDepartment, key == 'risks' ?  '::RisksInDepartments' : '::OpportunitiesInDepartments');
      this.getItemsTreatmentPotentials(type, key);
    });
  }


  risksTreatmentPotentialsBefore;
  risksTreatmentPotentialsAfter;
  opportunitiesTreatmentPotentialsBefore;
  opportunitiesTreatmentPotentialsAfter;
  getItemsTreatmentPotentials(type, key) {
    this.riskAndOpportunityService.getmitigation({ search:'', type,DepartmentId:null,UserId:null,Potential:null,Status:null, maxResultCount:null })
    .subscribe((response) => {
      let riskitem = [
        { value: response.riskItemVeryLow, id: '1_0' },
        { value: response.riskItemLow, id: '2_3' },
        { value: response.riskItemMeduim, id: '6_4' },
        { value: response.riskItemHigh, id: '9_8' },
        { value: response.riskItemVeryHigh, id: '12_16' },
      ];
      let reEvaluationitem = [
        { value: response.reEvaluationVeryLow, id: '1' },
        { value: response.reEvaluationLow, id: '2' },
        { value: response.reEvaluationMeduim, id: '4' },
        { value: response.reEvaluationHigh, id: '8' },
        { value: response.reEvaluationVeryHigh, id: '12' },
      ];

      this.createPotentialChart(key + 'TreatmentPotentialsBefore' , riskitem        , type == 'risks' ? '::Risk:Potential' : '::Opportunity:Potential', type , 'BeforeMitigation');
      this.createPotentialChart(key + 'TreatmentPotentialsAfter' , reEvaluationitem, type == 'risks' ? '::Risk:Potential' : '::Opportunity:Potential', type , 'AfterMitigation');
    });
  }

  onChartClick(ev){
    window.open('/risks-management/dashboard-report' + ev.data.groupId  , "_blank");
  }

  createDepartmentChart(key, departments, title ) {
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

  createPotentialChart(key,PotentialValue, title, type, period ) {
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

  createStatusChart(opened,closed, title) {
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
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        containLabel: true
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
            fontSize:12,
            fontWeight:'bold',
            fontFamily:this.fontFamily,
          },
        }
      ]
    }
  }


  CreateTreatementChart(Treatement,TreatementNo, title) {
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
      backgroundColor: '#fefefe'
    });
  }


  doPrint() {
    for(let key in this.charts) {
      this.charts[key].img = this.charts[key].chart.getDataURL({
        pixelRatio: 2,
        backgroundColor: '#fefefe'
      });
    }
    setTimeout(() => {
      this.printEle.emit(document.getElementsByClassName('print-section-2')[0].innerHTML);
    }, 100)
  }

}
