import { ToasterService } from '@abp/ng.theme.shared';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigStateService } from '@abp/ng.core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { DocumentService } from '@proxy/documents';
import { EmployeeService } from '@proxy/employees';
import { documentTypeOptions } from '@proxy/documents/document-type.enum';
import { parseISO } from 'date-fns';

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.scss'],
  host: {'class': 'customClass'}
})
export class DocumentCreateComponent implements OnInit{
  form: FormGroup;

  mode;
  FormMode = FormMode;
  DocumentType = documentTypeOptions;
  AllCategories;

  constructor(
    private configStateService:ConfigStateService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toasterService:ToasterService,
    private documentService: DocumentService,
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

    this.documentService.getAllCategories().subscribe(result => {
      this.AllCategories = result.items;
    });



    this.form = new FormGroup({
      code: new FormControl({value:null, disabled:true}, Validators.required),
      type: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      ownersIds: new FormControl(null, Validators.required),
      //reviewersIds: new FormControl({value:this.documentData?.reviewersIds?.map(t=>t.id)}, Validators.required),
      requiredReviewersIds: new FormControl(null, Validators.required),
      optionalReviewersIds: new FormControl(null, Validators.required),
      requiredApproversIds: new FormControl(null, Validators.required),
      optionalApproversIds: new FormControl(null, Validators.required),
      validationStartDate: new FormControl(null, Validators.required),
      validationEndtDate: new FormControl(null, Validators.required),
      description: new FormControl(null),
      categoriesIds: new FormControl(null, Validators.required),
  });

  if(this.mode == this.FormMode.Edit) {
    this.documentService.get(this.activatedRoute.snapshot.params.documentId).subscribe( data => {
      this.documentData = data;
      let DocumentData:any = {...data};
      DocumentData['validationStartDate'] = DocumentData?.validationStartDate ? parseISO(DocumentData['validationStartDate']) : null;
      DocumentData['validationEndtDate'] = DocumentData?.validationEndtDate ? parseISO(DocumentData['validationEndtDate']) : null;
      DocumentData['optionalReviewersIds'] = DocumentData?.optionalReviewersIds?.map(t=>t.employeeId)
      DocumentData['requiredReviewersIds'] = DocumentData?.requiredReviewersIds?.map(t=>t.employeeId)
      DocumentData['optionalApproversIds'] = DocumentData?.optionalApproversIds?.map(t=>t.employeeId)
      DocumentData['requiredApproversIds'] = DocumentData?.requiredApproversIds?.map(t=>t.employeeId)
      DocumentData['ownersIds'] = DocumentData?.ownersIds?.map(t=>t.employeeId)
      DocumentData['categoriesIds'] = DocumentData?.categories?.map(t=>t.id)
      // delete DocumentData["code"];
      this.form.patchValue(DocumentData);
    })
    
  } else if(this.mode == this.FormMode.Create){
    //delete DocumentData["validationStartDate"];
    //delete DocumentData["validationEndtDate"];
  }
}

 
  save(){
    if (this.form.invalid) return;

    let data = this.form.getRawValue();
    data['validationStartDate'] = data['validationStartDate'] ? moment(data['validationStartDate']).toISOString() : null;
    data['validationEndtDate'] = data['validationEndtDate'] ? moment(data['validationEndtDate']).toISOString() : null;

    const request = this.documentData?.id
      ? this.documentService.update(this.documentData.id, data)
      : this.documentService.create(data);

    request.subscribe(() => {
      this.toasterService.success('::SuccessfullySaved', "");
      if(this.mode == this.FormMode.Create){
        this.router.navigate(['documents'])
      }
    });
  }
}
