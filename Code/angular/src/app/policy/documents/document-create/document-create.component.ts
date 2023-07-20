import { ToasterService } from '@abp/ng.theme.shared';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigStateService } from '@abp/ng.core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit,Input } from '@angular/core';
import { InternalAuditPreparationService } from '@proxy/InternalAuditPreparations';
import * as moment from 'moment';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { PolicyService } from '@proxy/policies';
import { EmployeeService } from '@proxy/employees';
import { policyTypeOptions } from '@proxy/policies/policy-type.enum';
import { parseISO } from 'date-fns';
import { timer } from 'rxjs';
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
  AllCategories;

  constructor(
    private configStateService:ConfigStateService,
    private activatedRoute:ActivatedRoute,
    private internalAuditPreparationService:InternalAuditPreparationService,
    private router:Router,
    private toasterService:ToasterService,
    private policyService: PolicyService,
    private employeeService: EmployeeService,


  ) { }

  allEmployees;
  selected;
  documentData;
  ngOnInit(): void {
    this.mode = this.activatedRoute.snapshot.data.mode;
    this.employeeService.getEmployeeListLookup().subscribe(result => {
      this.allEmployees = result.items;
    });

    this.policyService.getAllCategories().subscribe(result => {
      this.AllCategories = result.items;
    });


    this.form = new FormGroup({
        //id: new FormControl(null),
        type: new FormControl(null, Validators.required),
        name: new FormControl(null, Validators.required),
        nameAr: new FormControl(null, Validators.required),
        nameEn: new FormControl(null),
        ownersIds: new FormControl(null),
        reviewersIds: new FormControl(null),
        approversIds: new FormControl(null, Validators.required),
        validationStartDate: new FormControl(null, Validators.required),
        validationEndtDate: new FormControl(null, Validators.required),
        compliancePercentage: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        categoryIds: new FormControl(null, Validators.required),
    });

   

    let DocumentData = Object.assign({}, this.documentData)
    if(this.mode == this.FormMode.Edit){
      DocumentData['validationStartDate'] = DocumentData?.validationStartDate ? parseISO(DocumentData['validationStartDate']) : null;
      DocumentData['validationEndtDate'] = DocumentData?.validationEndtDate ? parseISO(DocumentData['validationEndtDate']) : null;
      delete DocumentData["code"];
      this.form.patchValue(DocumentData);

  
    }else if(this.mode == this.FormMode.Create){
      //delete DocumentData["validationStartDate"];
      //delete DocumentData["validationEndtDate"];
    }
  }

  
 
  save(){
    /* if (this.form.invalid) {
      return;
    } */

    let data = this.form.getRawValue();

    data['validationStartDate'] = data['validationStartDate'] ? moment(data['validationStartDate']).toISOString() : null;
    data['validationEndtDate'] = data['validationEndtDate'] ? moment(data['validationEndtDate']).toISOString() : null;
    
    data['nameEn'] = data['nameAr'] ;
    const request = this.documentData?.id
      ? this.policyService.update(this.documentData.id, data)
      : this.policyService.create(data);

    request.subscribe(() => {
      this.toasterService.success('::SuccessfullySaved', "");
      if(this.mode == this.FormMode.Create){
        this.router.navigate(['policy/documents'])
      }
    });
  }
}
