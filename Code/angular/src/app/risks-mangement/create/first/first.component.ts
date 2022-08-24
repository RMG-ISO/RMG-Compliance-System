import { Component, Input, OnInit } from '@angular/core';
import { StaticDataService } from '@proxy/StaticData';
import { Type } from '../../list/list.component';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {
  @Input('form') form;
  Type = Type;
  

  constructor(
    private staticDataService:StaticDataService,

  ) { }

  sectors;
  departments;
  categories
  ngOnInit(): void {
    this.getList(1, 'sectors');
    this.getList(2, 'departments');
    this.getList(3, 'categories');
  }

  getList(Type, key) {
    this.staticDataService.getList({Type:Type, search:null, maxResultCount:null }).subscribe(r => {
      this[key] = r.items;
    })
  }

}
