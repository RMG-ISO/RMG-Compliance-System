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
        type: new FormControl(null, Validators.required),
        nameAr: new FormControl(null, Validators.required),
        nameEn: new FormControl(null),
        ownersIds: new FormControl(null, Validators.required),
        //reviewersIds: new FormControl({value:this.documentData?.reviewersIds?.map(t=>t.id)}, Validators.required),
        reviewersIds: new FormControl(null, Validators.required),
        approversIds: new FormControl(null, Validators.required),
        validationStartDate: new FormControl(null, Validators.required),
        validationEndtDate: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        categoryIds: new FormControl(null, Validators.required),
    });

   

    let DocumentData = Object.assign({}, this.documentData)
    if(this.mode == this.FormMode.Edit){
      DocumentData['validationStartDate'] = DocumentData?.validationStartDate ? parseISO(DocumentData['validationStartDate']) : null;
      DocumentData['validationEndtDate'] = DocumentData?.validationEndtDate ? parseISO(DocumentData['validationEndtDate']) : null;
      DocumentData['reviewersIds'] = DocumentData?.reviewersIds?.map(t=>t.employeeId)
      DocumentData['approversIds'] = DocumentData?.approversIds?.map(t=>t.employeeId)
      DocumentData['ownersIds'] = DocumentData?.ownersIds?.map(t=>t.employeeId)
      DocumentData['categoryIds'] = DocumentData?.categoryIds?.map(t=>t.id)
      delete DocumentData["code"];
      this.form.patchValue(DocumentData);

  
    }else if(this.mode == this.FormMode.Create){
      //delete DocumentData["validationStartDate"];
      //delete DocumentData["validationEndtDate"];
    }
  }

  findInvalidControls(f: FormGroup) {
    const invalid = [];
    const controls = f.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
 
  save(){
    console.log(this.form);
    let fada = this.findInvalidControls(this.form);
    console.log(fada);
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

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