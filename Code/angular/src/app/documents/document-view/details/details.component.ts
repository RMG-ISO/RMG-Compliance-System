import { ConfigStateService } from '@abp/ng.core';
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
  owners = [];
  userId;
  canEdit = false;
  constructor(private configService: ConfigStateService) {

  }

  ngOnInit(): void {
    this.userId = this.configService.getAll().currentUser.id;
    this.documentData.approvers.map(u => {
      if(u.isRequired) this.requiredApprovers.push(u);
      else this.optionalApprovers.push(u);
    })

    this.documentData.reviewers.map(u => {
      if(u.isRequired) this.requiredReviewers.push(u);
      else this.optionalReviewers.push(u);
    })

    this.owners = this.documentData.owners.map(o => o.id);
    this.canEdit = this.documentData.status !== DocumentStatus.Approved && this.owners.some(o => o == this.userId);
   
    //this.form.patchValue(this.selected);
  }
}
