import { DateValidators } from 'src/app/shared/validators/date-validator';
import { ToasterService } from '@abp/ng.theme.shared';
import { finalize } from 'rxjs/operators';
import { parseISO } from 'date-fns';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '@proxy/frameworks';
import { InternalAuditPreparationService } from '@proxy/InternalAuditPreparations';
import { DepartmentService } from '@proxy/departments';
import { EmployeeService } from '@proxy/employees';
import * as moment from 'moment';

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
  FormMode = FormMode;

  constructor(
    private activatedRoute:ActivatedRoute,
    private frameworkService:FrameworkService,
    private internalAuditPreparationService:InternalAuditPreparationService,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private toasterService:ToasterService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.mode = this.activatedRoute.snapshot.data.mode;
    this.form = new FormGroup({
      auditCode: new FormControl({value:null, disabled:true}),
      auditTitleEn: new FormControl(null, Validators.required),
      auditTitleAr: new FormControl(null, Validators.required),
      auditDescriptionEn: new FormControl(null, Validators.required),
      auditDescriptionAr: new FormControl(null, Validators.required),
      auditFieldEn: new FormControl(null, null),
      auditFieldAr: new FormControl(null, null),
      auditSetpsEn: new FormControl(null, null),
      auditSetpsAr: new FormControl(null, null),
      auditGoalsEn: new FormControl(null, null),
      auditGoalsAr: new FormControl(null, null),
      frameworkId: new FormControl(null, Validators.required),
      departmentId: new FormControl(null, Validators.required),
      auditorsIds:new FormControl(null, Validators.required),
      departmentRepresentatives:new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      riskOpportunityIds: new FormControl(null, null),
      id:new FormControl(null),
      isApprove:new FormControl(null),
      approveBy:new FormControl(null, Validators.required),
    }, {
      validators:[
        DateValidators.ValidateTwoDates('startDate', 'endDate')
      ]
    });

    if(this.mode == FormMode.Create) this.form.setValidators([DateValidators.ValidateTwoDates('startDate', 'endDate'),DateValidators.MinDate('startDate')])
    this.form.updateValueAndValidity();

    this.getItems();

    if(this.mode !== FormMode.Create) {
      this.internalAuditPreparationService.getByID(this.activatedRoute.snapshot.params.id).subscribe(r => {
        console.log(r);
        r['startDate'] = parseISO(r['startDate']);
        r['endDate'] = parseISO(r['endDate']);
        r['auditorsIds'] = r['auditorDto'].map(x => x.userId)
        r['departmentRepresentatives'] = r['auditorDeptDto'].map(x => x.userId)
        this.form.patchValue(r);
        this.changeDepartment(r['departmentId']);
        this.changeFramework(r['frameworkId'])
        if(r['isApprove']) {
          this.form.disable();
          this.mode = FormMode.View;
        } else this.form.controls.isApprove.setValue(null)
      })
    } else if (this.mode == FormMode.View) this.form.disable();
  }

  auditorsList;
  risksList;
  representativesList;
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

  }

  changeUsers(ev, control) {
    let oppsit = control.value || [];
    for(let i = oppsit.length - 1; i >= 0; i--) {
      if(ev.indexOf(oppsit[i]) > -1) oppsit.splice(i, 1);
    }
    control.patchValue(oppsit)
  }

  changeDepartment(id) {
    this.internalAuditPreparationService.getUserByDeptId(id).subscribe(r => {
      this.representativesList = r;
    })
  }

  changeFramework(id) {
    this.internalAuditPreparationService.RisksByFrameWorkeId(id).subscribe(r => {
      console.log(r);
      this.risksList = r;
      let ids = r.map(x => x.id);
      let newIds = [];
      for(let id of this.form.controls.riskOpportunityIds.value || []) {
        if(ids.includes(id)) newIds.push(id);
      }
      this.form.controls.riskOpportunityIds.setValue(newIds);
    })
  }

  isSaving = false;
  save() {
    if(this.form.invalid) return;
    this.isSaving = true;

    let value = {...this.form.getRawValue()};
    value.startDate = moment(value.startDate).utc(true).toDate();
    value.endDate = moment(value.endDate).utc(true).toDate();

    value['auditors'] = [];
    for(let id of value.auditorsIds) {
      value['auditors'].push({
        userId:id,
        isAuditor:true,
      })
    }

    for(let id of value.departmentRepresentatives) {
      value['auditors'].push({
        userId:id,
        departmentId:value.departmentId,
        isAuditor:false
      })
    }

    if(this.mode == FormMode.Create) this.internalAuditPreparationService.create(value)
    .pipe(
      finalize(() => this.isSaving = false)
    ).subscribe( r => {
      this.toasterService.success('::SuccessfullySaved', "");
      this.router.navigate(['/internal-audit/audit-setup/list'])
    })
    else this.internalAuditPreparationService.update(value.id, value)
    .pipe(
      finalize(() => this.isSaving = false)
    ).subscribe(r => {
      this.toasterService.success('::SuccessfullySaved', "");
      this.router.navigate(['/internal-audit/audit-setup/list'])
    })

  }
}
