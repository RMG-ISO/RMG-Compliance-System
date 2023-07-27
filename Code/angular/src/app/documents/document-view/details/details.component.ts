import { Component } from '@angular/core';
import { documentTypeOptions } from '@proxy/Documents';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  DocumentType = documentTypeOptions;

  selected;
  documentData;
  employeesObj;
  ngOnInit(): void {
    console.log('this.documentData');
    console.log(this.documentData);
  


   
    //this.form.patchValue(this.selected);
  }
}
