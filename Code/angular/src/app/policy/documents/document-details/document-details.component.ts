import { Component } from '@angular/core';
import { policyTypeOptions } from '@proxy/policies/policy-type.enum';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent {
  PolicyType = policyTypeOptions;

  selected;
  documentData;
  employeesObj;
  ngOnInit(): void {
    console.log('this.documentData');
    console.log(this.documentData);
  


   
    //this.form.patchValue(this.selected);
  }

}
