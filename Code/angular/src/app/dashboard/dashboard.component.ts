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

      let riskitem = [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
          names = [
            {
              value: this.localizationService.instant('VeryLow'),
              itemStyle:{
                color:'#03a008'
              }
            },
            {
              value: this.localizationService.instant('Low'),
              itemStyle:{
                color:'#26872a'
              }
            },
            {
              value: this.localizationService.instant('Medium'),
              itemStyle:{
                color:'#efe338'
              } 
            },
            { 
              value: this.localizationService.instant('High'),
              itemStyle:{
                color:'#f3a108'
              } 
           },
            {
              value: this.localizationService.instant('VeryHigh'),
              itemStyle:{
                color:'#b62e2e'
              } 
            },
          ];
    response.items.map(x => {
      if(x['potential'] == 1)                               riskitem[0].value += 1;
      else if(x['potential'] == 2 || x['potential'] == 3)   riskitem[1].value += 1;
      else if(x['potential'] == 4 || x['potential'] == 6)   riskitem[2].value += 1;
      else if(x['potential'] == 8)                          riskitem[3].value += 1;
      else if(x['potential'] == 12 || x['potential'] == 16) riskitem[4].value += 1;
    });


      this.createChartPotentialBars('riskBarsPotentials',names,riskitem, '::Risk:Potential');

       let risksByDepartments = {};
        for(let item of response.items) {
          if(risksByDepartments[item['departmentId']]) risksByDepartments[item['departmentId']].items.push(item);
          else risksByDepartments[item['departmentId']] = {
            items:[item],
            name:this.departments[item['departmentId']].name
          };
        }
        this.createChartBars('riskBarsOptions',risksByDepartments, '::RisksInDepartments')

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
    let names = [],
        values = [];
        // debugger;
        for(let i = 0; i < PotentialValue.length; i++) {
          values.push({
            value:PotentialValue[i].value,
            itemStyle:PotentialName[i].itemStyle
          })
        }
      // for(let key in PotentialValue) {
      //   values.push(PotentialValue[key].value)
      // }
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
  getListOpportunities() {
    this.riskAndOpportunityService.getList({  search: '', type:2,  maxResultCount:null }).subscribe((response) => {
      this.itemsOpportunity = response.items;
      this.totalCountOpportunity = response.totalCount;
      this.opportunitiesChart = this.createRisksOppChart(response.items.filter(x => x['status'] == 1).length, response.items.filter(x => x['status'] == 2).length,'::Opportunity');
      this.treatmentOpportunitiesChart = this.TreatementRisksOppChart(response.items.filter(x => x['isTreatment'] == 1).length, response.items.filter(x => x['isTreatment'] == 0).length,'::Opportunity');

      let riskitem = [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
          names = [
            {
              value: this.localizationService.instant('VeryLow'),
              itemStyle:{
                color:'#03a008'
              }
            },
            {
              value: this.localizationService.instant('Low'),
              itemStyle:{
                color:'#26872a'
              }
            },
            {
              value: this.localizationService.instant('Medium'),
              itemStyle:{
                color:'#efe338'
              } 
            },
            { 
              value: this.localizationService.instant('High'),
              itemStyle:{
                color:'#f3a108'
              } 
           },
            {
              value: this.localizationService.instant('VeryHigh'),
              itemStyle:{
                color:'#b62e2e'
              } 
            },
          ];
      response.items.map(x => {
      if(x['potential'] == 1)                               riskitem[0].value += 1;
      else if(x['potential'] == 2 || x['potential'] == 3)   riskitem[1].value += 1;
      else if(x['potential'] == 4 || x['potential'] == 6)   riskitem[2].value += 1;
      else if(x['potential'] == 8)                          riskitem[3].value += 1;
      else if(x['potential'] == 12 || x['potential'] == 16) riskitem[4].value += 1;
      });


      this.createChartPotentialBars('riskBarsOpportunityPotentials',names,riskitem, '::Opportunity:Potential');


      let oppByDepartments = {};
      for(let item of response.items) {
        if(oppByDepartments[item['departmentId']]) oppByDepartments[item['departmentId']].items.push(item);
        else oppByDepartments[item['departmentId']] = {
          items:[item],
          name:this.departments[item['departmentId']].name
        };
      }
      this.createChartBars('opportunitiesBarsOptions', oppByDepartments, '::OpportunitiesInDepartments')
    });
  }

  fontFamily = 'ElMessiri, Roboto, Helvetica Neue,  sans-serif';

  createRisksOppChart(opened,closed, title) {
    return {
      // title: {
      //     text: this.localizationService.instant(title),
      //     // subtext: '',
      //     left: 'center',
      //     textStyle:{
      //       fontFamily:this.fontFamily
      //     }
      //   },
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
      // title: {
      //     text: this.localizationService.instant(title),
      //     // subtext: '',
      //     left: 'center',
      //     textStyle:{
      //       fontFamily:this.fontFamily
      //     }
      //   },
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
              fontSize:12,
              fontWeight:'bold',
              fontFamily:this.fontFamily
            },
          }
        ]
    }
  }

}
