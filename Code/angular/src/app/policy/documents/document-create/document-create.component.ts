import { ToasterService } from '@abp/ng.theme.shared';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigStateService } from '@abp/ng.core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { InternalAuditPreparationService } from '@proxy/InternalAuditPreparations';
import * as moment from 'moment';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { PolicyService } from '@proxy/policies';
import { EmployeeService } from '@proxy/employees';
import { policyTypeOptions } from '@proxy/policies/policy-type.enum';

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.scss'],
  host: {'class': 'customClass'}
})
export class DocumentCreateComponent {
  form: FormGroup;

  mode;
  FormMode = FormMode;
  PolicyType = policyTypeOptions;
  constructor(
    private configStateService:ConfigStateService,
    private activatedRoute:ActivatedRoute,
    private internalAuditPreparationService:InternalAuditPreparationService,
    private router:Router,
    private toasterService:ToasterService,
    private policyService: PolicyService,
    private employeeService: EmployeeService,


  ) { }

  ngOnInit(): void {
    this.mode = this.activatedRoute.snapshot.data.mode;
    console.log(this.mode);
    console.log(this.PolicyType);
    
    this.employeeService.getEmployeeListLookup().subscribe(result => {
      this.allEmployees = result.items;
    });
    this.form = new FormGroup({
        id: new FormControl(null),
        type: new FormControl(null, Validators.required),
        nameAr: new FormControl(null, Validators.required),
        ownersIds: new FormControl(null),
        reviewersIds: new FormControl(null),
        approversIds: new FormControl(null, Validators.required),
        validationStartDate: new FormControl(null, Validators.required),
        validationEndtDate: new FormControl(null, Validators.required),
        compliancePercentage: new FormControl(null, Validators.required),
        status: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        categoryIds: new FormControl(null, Validators.required),
        employeesIds: new FormControl(null, Validators.required),
    });

    //this.form.patchValue(this.selected);
  }

  allEmployees;
  selected;
  save(){
    console.log(this.form.getRawValue());
   /*  if (this.form.invalid) {
      return;
    } */


    const request = this.selected?.id
      ? this.policyService.update(this.selected.id, this.form.getRawValue())
      : this.policyService.create(this.form.getRawValue());

    request.subscribe(() => {
  /*     this.isModalOpen = false;
      this.form.reset();
      this.list.get(); */
    });
  }
}
