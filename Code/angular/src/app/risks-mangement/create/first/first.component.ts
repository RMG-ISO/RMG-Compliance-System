import { IdentityUserService } from '@abp/ng.identity';
import { Component, Input, OnInit } from '@angular/core';
import { StaticDataService } from '@proxy/StaticData';
import { Type } from '../../module.enums';

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
    private userService:IdentityUserService
  ) { }

  sectors;
  departments;
  categories;
  users;
  riskContext;
  ngOnInit(): void {
    this.getList(1, 'sectors');
    this.getList(2, 'departments');
    this.getList(3, 'categories');
    this.getList(10, 'riskContext');

    this.userService.getList({maxResultCount:null, filter:null}).subscribe(r => {
      this.users = r.items
    })
  }

  getList(Type, key) {
    this.staticDataService.getList({Type:Type, search:null, maxResultCount:null }).subscribe(r => {
      this[key] = r.items;
    })
  }

}
