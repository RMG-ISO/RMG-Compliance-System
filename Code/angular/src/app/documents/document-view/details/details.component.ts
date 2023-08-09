import { Component, OnInit } from '@angular/core';
import { DocumentStatus, DocumentType } from '@proxy/documents';
import { DocumentDto } from '@proxy/documents/dtos';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  documentData:DocumentDto;

  
  DocumentType = DocumentType;
  DocumentStatus = DocumentStatus;

  selected;
  employeesObj;

  requiredApprovers = [];
  optionalApprovers = [];

  requiredReviewers = [];
  optionalReviewers = [];

  ngOnInit(): void {
    this.documentData.approvers.map(u => {
      if(u.isRequired) this.requiredApprovers.push(u);
      else this.optionalApprovers.push(u);
    })

    this.documentData.reviewers.map(u => {
      if(u.isRequired) this.requiredReviewers.push(u);
      else this.optionalReviewers.push(u);
    })

   
    //this.form.patchValue(this.selected);
  }
}
