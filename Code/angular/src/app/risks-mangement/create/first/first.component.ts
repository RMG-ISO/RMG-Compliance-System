import { IdentityUserService} from '@abp/ng.identity/proxy';
import { Component, Input, OnInit } from '@angular/core';
import { StaticDataService } from '@proxy/static-data';
import { DepartmentService } from '@proxy/departments';
import { Type } from '../../module.enums';
import { FrameworkService } from '@proxy/frameworks';

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
    private departmentService:DepartmentService,
    private userService:IdentityUserService,
    private frameworkService:FrameworkService
  ) { }

  sectors;
  departments;
  categories;
  users;
  riskContext;
  frameworks;
  ngOnInit(): void {
    this.getList(8, 'sectors');
    this.getListdepartments();
    this.getList(1, 'categories');
    this.getList(7, 'riskContext');

    this.userService.getList({maxResultCount:null, filter:null}).subscribe(r => {
      this.users = r.items
    });

    this.frameworkService.getList({maxResultCount:null}).subscribe(r => this.frameworks = r.items)
  }

  getList(Type, key) {
    this.staticDataService.getList({type:Type, search:null, maxResultCount:null }).subscribe(r => {
      this[key] = r.items;
    })
  }
  getListdepartments() {
    this.departmentService.getList({search:null, maxResultCount:null }).subscribe(r => {
      this.departments = r.items;
    })
  }

}
