import { FrameworkService } from '@proxy/frameworks';
import { FormGroup, FormControl } from '@angular/forms';
import { ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '@proxy/departments';
import { InternalAuditPreparationService } from '@proxy/InternalAuditPreparations';
import * as moment from 'moment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[
    ListService
  ]
})
export class ListComponent implements OnInit {
  searchVal;

  constructor(
    public  list:ListService,
    private internalAuditPreparationService:InternalAuditPreparationService,
    private departmentService: DepartmentService,
    private frameworkService:FrameworkService
  ) { }

  departments;
  filterForm:FormGroup;
  frameworks;
  ngOnInit(): void {
    this.initSearch();
    this.getList();
  }

  initSearch() {
    this.filterForm = new FormGroup({
      // ApproveBy:new FormControl(),
      IsApprove:new FormControl(null),
      approveDate:new FormControl(null),
      DepartmentId:new FormControl(null),
      FrameworkId:new FormControl(null),
    });

    this.departmentService.getList({maxResultCount:null}).subscribe(result => {
      this.departments = result.items;
    });

    this.frameworkService.getList({maxResultCount:null}).subscribe(result => {
      this.frameworks = result.items;
    });
    
    this.filterForm.valueChanges.subscribe(r => this.list.get() )
  }

  showFilters = false;
  filter = {}
  changeFilter(val) {
    this.filter = {...this.filter, ...val};
    this.list.get();
  }



  items;
  totalCount
  getList() {
    const streamCreator = (query) => {
      let filters = {...this.filterForm.value};
      if(filters.approveDate) filters.approveDate = moment(filters.approveDate).utc(true).toDate();
      return this.internalAuditPreparationService.getList({ ...query, Search: this.searchVal, ...filters });
    }
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
      console.log(response);
    });
  }

}
