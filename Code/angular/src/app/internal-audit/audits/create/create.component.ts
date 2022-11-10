import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '@proxy/frameworks';
import { InternalAuditPreparationService } from '@proxy/InternalAuditPreparations';
import { DepartmentService } from '@proxy/departments';
import { EmployeeService } from '@proxy/employees';
import { RiskAndOpportunityService } from '@proxy/RiskAndOpportunity';
import { Type } from 'src/app/risks-mangement/module.enums';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form:FormGroup;
  mode;
  frameworks;
  departments;
  allEmployees;

  constructor(
    private activatedRoute:ActivatedRoute,
    private frameworkService:FrameworkService,
    private internalAuditPreparationService:InternalAuditPreparationService,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private riskAndOpportunityService:RiskAndOpportunityService,
  ) { }

  ngOnInit(): void {
    this.mode = this.activatedRoute.snapshot.data.mode;
    this.form = new FormGroup({
      auditCode: new FormControl(null),
      auditTitleEn: new FormControl(null, Validators.required),
      auditTitleAr: new FormControl(null, Validators.required),
      auditDescriptionEn: new FormControl(null, Validators.required),
      auditDescriptionAr: new FormControl(null, Validators.required),
      auditFieldEn: new FormControl(null, Validators.required),
      auditFieldAr: new FormControl(null, Validators.required),
      auditSetpsEn: new FormControl(null, Validators.required),
      auditSetpsAr: new FormControl(null, Validators.required),
      auditGoalsEn: new FormControl(null, Validators.required),
      auditGoalsAr: new FormControl(null, Validators.required),
      frameworkId: new FormControl(null, Validators.required),
      departmentId: new FormControl(null, Validators.required),
      auditorsIds:new FormControl(null, Validators.required),
      departmentRepresentatives:new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      riskOpportunityId: new FormControl(null, Validators.required),
    });

    this.getItems();

  }

  auditorsList;
  risksList;
  getItems() {
    this.frameworkService.getList({maxResultCount:null}).subscribe(result => {
      this.frameworks = result.items;
    });

    this.departmentService.getList({maxResultCount:null}).subscribe(result => {
      this.departments = result.items;
    });
 
    this.employeeService.getList({maxResultCount:null}).subscribe(result => {
      this.allEmployees = result.items;
      this.auditorsList = result.items;
    });

    this.riskAndOpportunityService.getList({ maxResultCount:null, type:Type.Risk }).subscribe(r => {
      this.risksList = r.items
    })
  }

  changeDepartment($event) {

  }

  getEmployeesByDepartment() {
    // this.employeeService.getList()
  }

  save() {
    if(this.form.invalid) return;

    let value = {...this.form.value};
    value['auditors'] = [];
    for(let id of value.auditorsIds) {
      value['auditors'].push({
        userId:id,
        isAuditor:true,
        UserId:id,
        IsAuditor:true
      })
    }

    for(let id of value.departmentRepresentatives) {
      value['auditors'].push({
        userId:id,
        UserId:id,
        departmentId:value.departmentId,
        DepartmentId:value.departmentId
      })
    }

    console.log(value);
    this.internalAuditPreparationService.create(value).subscribe( r => {
      console.log(r);
    })
  }
}