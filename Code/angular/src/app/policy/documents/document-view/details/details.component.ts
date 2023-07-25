import { Component } from '@angular/core';
import { policyTypeOptions } from '@proxy/policies';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
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
