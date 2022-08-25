import { Component, Input, OnInit } from '@angular/core';
import { StaticDataService } from '@proxy/StaticData';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {
  @Input('form') form;

  constructor(
    private staticDataService:StaticDataService,
  ) { }

  ngOnInit(): void {
    this.getList(4, 'likelihood');
    this.getList(5, 'controlAssesment');
    // this.getList(6, 'potentials');
    this.getList(7, 'impacts');
  }

  // potentials;
  controlAssesment;
  likelihood;
  impacts;
  getList(Type, key) {
    this.staticDataService.getList({Type:Type, search:null, maxResultCount:null }).subscribe(r => {
      this[key] = r.items;
    })
  }

}
