import { Type } from './../../module.enums';
import { Component, Input, OnInit } from '@angular/core';
import { StaticDataService } from '@proxy/StaticData';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss']
})
export class ThirdComponent implements OnInit {
  @Input('form') form;
  @Input('itemData') itemData;
  Type = Type
  constructor(
    private staticDataService:StaticDataService
  ) { }
  
  potentials;
  riskTreatment
  ngOnInit(): void {
    this.staticDataService.getList({Type:'7', search:null, maxResultCount:null }).subscribe(r => {
      this.potentials = r.items;
    })

    this.staticDataService.getList({Type:'9', search:null, maxResultCount:null }).subscribe(r => {
      this.riskTreatment = r.items;
    })
  }

}
