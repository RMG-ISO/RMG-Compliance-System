import { FrameworkService } from '@proxy/frameworks';
import { FormGroup, FormControl } from '@angular/forms';
import { ListService, LocalizationService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '@proxy/departments';
import { InternalAuditPreparationService } from '@proxy/InternalAuditPreparations';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '@proxy/employees';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';

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
    private frameworkService:FrameworkService,
    private activatedRoute:ActivatedRoute,
    private employeeService:EmployeeService,
    private localizationService:LocalizationService,
    private confirmation:ConfirmationService,
    private toasterService:ToasterService
  ) { }



  route;
  title = '::AuditSetup'
  ngOnInit(): void {
    this.initSearch();
    this.getList();
    console.log(this.activatedRoute.snapshot);
    this.route = this.activatedRoute.snapshot.data.route;
    if(this.route == 'approved-audits') this.title = '::AuditsStatus';
  }

  departments;
  filterForm:FormGroup;
  frameworks;
  auditorsList;
  initSearch() {
    this.filterForm = new FormGroup({
      ApproveBy:new FormControl(),
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

    this.employeeService.getList({maxResultCount:null}).subscribe(result => {
      this.auditorsList = result.items;
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

  delete(model) {
    let title = this.localizationService.currentLang.includes('ar') ?  model['questionTextAr'] : model['questionTextEn'];
    this.confirmation.warn('::DeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[title]}).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.internalAuditPreparationService.delete(model.id).subscribe(() => {
          this.list.get();
          this.toasterService.success('::SuccessfullyDeleted', "");
        });
      }
    });
  }

}
