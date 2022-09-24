import { LocalizationService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
    this.getListRisks();
    this.getListOpportunities();
  }

  itemsRisk;
  totalCountRisk;

  risksChart;
  getListRisks() {
    this.riskAndOpportunityService.getList({ search: '', type:1, maxResultCount:null }).subscribe((response) => {
      this.itemsRisk = response.items;
      this.totalCountRisk = response.totalCount;
      this.risksChart = this.createRisksOppChart(response.items.filter(x => x['status'] == 1).length, response.items.filter(x => x['status'] == 2).length,'::Risk')
    });
  }

  itemsOpportunity;
  totalCountOpportunity;
  opportunitiesChart;
  getListOpportunities() {
    this.riskAndOpportunityService.getList({  search: '', type:2,  maxResultCount:null }).subscribe((response) => {
      this.itemsOpportunity = response.items;
      this.totalCountOpportunity = response.totalCount;
      this.opportunitiesChart = this.createRisksOppChart(response.items.filter(x => x['status'] == 1).length, response.items.filter(x => x['status'] == 2).length,'::Opportunity')
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

}
