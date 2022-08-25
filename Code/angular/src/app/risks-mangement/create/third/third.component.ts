import { Component, Input, OnInit } from '@angular/core';
import { StaticDataService } from '@proxy/StaticData';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss']
})
export class ThirdComponent implements OnInit {
  @Input('form') form;

  constructor(
    private staticDataService:StaticDataService
  ) { }
  
  potentials
  ngOnInit(): void {
    this.staticDataService.getList({Type:'6', search:null, maxResultCount:null }).subscribe(r => {
      this.potentials = r.items;
    })
  }

}
