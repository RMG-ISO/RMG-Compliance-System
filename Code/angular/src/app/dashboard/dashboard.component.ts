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

  constructor(
    private localizationService:LocalizationService,
    private riskAndOpportunityService:RiskAndOpportunityService,
    private departmentService:DepartmentService,
  ) { }

  departments = {};
  ngOnInit(): void {
    this.departmentService.getList({search:null, maxResultCount:null }).subscribe(r => {
      this.getListRisks();
      this.getListOpportunities();
      r.items.map(item => {
        this.departments[item.id] = item;
      });

    })
  }

  itemsRisk;
  totalCountRisk;

  risksChart;
  treatmentRisksChart;
  getListRisks() {
    this.riskAndOpportunityService.getList({ search: '', type:1, maxResultCount:null }).subscribe((response) => {
      this.itemsRisk = response.items;
      this.totalCountRisk = response.totalCount;

     let  riskitem=[];
     let names=[];


     riskitem.push({value:response.items.filter(x => x['potential'] == 1).length});
     riskitem.push({value:response.items.filter(x => x['potential'] == 2||x['potential'] == 3).length});
     riskitem.push({value:response.items.filter(x => x['potential'] == 4||x['potential'] == 6).length});
     riskitem.push({value:response.items.filter(x => x['potential'] == 8).length});
     riskitem.push({value:response.items.filter(x => x['potential'] == 12||x['potential'] == 16).length});

      names.push({name:'Very low'});
      names.push({name:'Low'});
      names.push({name:'Medium'});
      names.push({name:'High'});
      names.push({name:'Very High'});

      this.createChartPotentialBars('riskBarsPotentials',names,riskitem, '::Potentials');

       let risksByDepartments = {};
        for(let item of response.items) {
          if(risksByDepartments[item['departmentId']]) risksByDepartments[item['departmentId']].items.push(item);
          else risksByDepartments[item['departmentId']] = {
            items:[item],
            name:this.departments[item['departmentId']].name
          };
        }
        this.createChartBars('riskBarsOptions',risksByDepartments, '::المخاطر بالإدارات')

      this.risksChart = this.createRisksOppChart(response.items.filter(x => x['status'] == 1).length, response.items.filter(x => x['status'] == 2).length,'::Risk');
      this.treatmentRisksChart = this.TreatementRisksOppChart(response.items.filter(x => x['isTreatment'] == 1).length, response.items.filter(x => x['isTreatment'] == 0).length,'::Risk');
    });
  }
  riskBarsPotentials;
  riskBarsOptions;
  opportunitiesBarsOptions;
  createChartBars(key, departments, title ) {
    let names = [],
        values = [];
    for(let key in departments) {
      names.push(departments[key].name);
      values.push(departments[key].items.length)
    }

    this[key] = {
      title: {
        text: this.localizationService.instant(title),
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
          type: 'bar'
        }
      ]
    };

  }
  createChartPotentialBars(key, PotentialName,PotentialValue, title ) {
    let names = [],
        values = [];
        debugger;
    for(let key in PotentialValue) {
      values.push(PotentialValue[key].value)
    }
    for(let key in PotentialName) {
      names.push(PotentialName[key].name);
    }

    this[key] = {
      title: {
        text: this.localizationService.instant(title),
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
          type: 'bar'
        }
      ]
    };

  }

  itemsOpportunity;
  totalCountOpportunity;
  opportunitiesChart;
  treatmentOpportunitiesChart;
  riskBarsOpportunityPotentials;
  getListOpportunities() {
    this.riskAndOpportunityService.getList({  search: '', type:2,  maxResultCount:null }).subscribe((response) => {
      this.itemsOpportunity = response.items;
      this.totalCountOpportunity = response.totalCount;
      this.opportunitiesChart = this.createRisksOppChart(response.items.filter(x => x['status'] == 1).length, response.items.filter(x => x['status'] == 2).length,'::Opportunity');
      this.treatmentOpportunitiesChart = this.TreatementRisksOppChart(response.items.filter(x => x['isTreatment'] == 1).length, response.items.filter(x => x['isTreatment'] == 0).length,'::Opportunity');

     let  riskitem=[];
     let  names=[];

          riskitem.push({value:response.items.filter(x => x['potential'] == 1).length});
          riskitem.push({value:response.items.filter(x => x['potential'] == 2||x['potential'] == 3).length});
          riskitem.push({value:response.items.filter(x => x['potential'] == 4||x['potential'] == 6).length});
          riskitem.push({value:response.items.filter(x => x['potential'] == 8).length});
          riskitem.push({value:response.items.filter(x => x['potential'] == 12||x['potential'] == 16).length});

      names.push({name:'Very low'});
      names.push({name:'Low'});
      names.push({name:'Medium'});
      names.push({name:'High'});
      names.push({name:'Very High'});

      this.createChartPotentialBars('riskBarsOpportunityPotentials',names,riskitem, '::Potentials');


      let oppByDepartments = {};
      for(let item of response.items) {
        if(oppByDepartments[item['departmentId']]) oppByDepartments[item['departmentId']].items.push(item);
        else oppByDepartments[item['departmentId']] = {
          items:[item],
          name:this.departments[item['departmentId']].name
        };
      }
      this.createChartBars('opportunitiesBarsOptions', oppByDepartments, '::الفرص بالإدارات')
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
          bottom: 10,
          left: 'center',
          data: [this.localizationService.instant('::Status:Open'), this.localizationService.instant('::Status:Close')],
          textStyle:{
            fontFamily:this.fontFamily
          }
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
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
                 color:'#FF0000'
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
              fontSize:16,
              fontWeight:'bold',
              fontFamily:this.fontFamily
            },
          }
        ]
    }
  }


  TreatementRisksOppChart(Treatement,TreatementNo, title) {
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
          bottom: 10,
          left: 'center',
          data: [this.localizationService.instant('::Status:Open'), this.localizationService.instant('::Status:Close')],
          textStyle:{
            fontFamily:this.fontFamily
          }
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
              {
                value: Treatement,
                name: this.localizationService.instant('::Status:Treatement'),
                itemStyle:{
                 color:'#32ba94'
                }
              },
              {
                value: TreatementNo,
                name: this.localizationService.instant('::Status:TreatementNo'),
                itemStyle: {
                 color:'#FF0000'
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
              fontSize:16,
              fontWeight:'bold',
              fontFamily:this.fontFamily
            },
          }
        ]
    }
  }

}
