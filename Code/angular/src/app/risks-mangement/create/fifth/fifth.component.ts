import { Type } from './../../module.enums';
import { IdentityUserService } from '@abp/ng.identity/proxy';
import { Component, Input, OnInit } from '@angular/core';
import { StaticDataService } from '@proxy/StaticData';
import { Status } from '../../module.enums';

@Component({
  selector: 'app-fifth',
  templateUrl: './fifth.component.html',
  styleUrls: ['./fifth.component.scss']
})
export class FifthComponent implements OnInit {
  @Input('itemData') itemData;
  @Input('form') form;
  Status = Status;
  Type = Type;
  
  constructor(
    private userService:IdentityUserService,
    private staticDataService:StaticDataService
  ) { }

  users;

  likelihood
  impacts
  potentials
  ngOnInit(): void {
    this.userService.getList({maxResultCount:null, filter:null}).subscribe(r => {
      this.users = r.items
    });

    this.getList(2, 'likelihood');
    this.getList(4, 'impacts');
    this.getList(3, 'potentials');
  }


  getList(Type, key) {
    this.staticDataService.getList({Type:Type, search:null, maxResultCount:null }).subscribe(r => {
      this[key] = r.items;
    })
  }


}
