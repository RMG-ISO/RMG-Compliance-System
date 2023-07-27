import { ConfigStateService, ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentService, DocumentStatus } from '@proxy/Documents';
import { DocumentDto } from '@proxy/Documents/dtos';
import { BehaviorSubject } from 'rxjs';

enum DocumentRoles {
  Creator = "Creator",
  Owner = "Owner",
  RequiredReviewr = "RequiredReviewr",
  OptionalReviewr = "OptionalReviewr",
  RequiredApprover = "RequiredApprover",
  OptionalApprover = "OptionalApprover",
}

enum Actions {
  NoAction = "NoAction",
  ReturnToCreator = "ReturnToCreator",
  Approve = "Approve",
  Finish = "Finish"
}

@Component({
  selector: 'app-revision-approve',
  templateUrl: './revision-approve.component.html',
  styleUrls: ['./revision-approve.component.scss'],
  providers:[ListService]
})
export class RevisionApproveComponent implements OnInit {
  DocumentStatus = DocumentStatus;
  Actions = Actions;
  
  constructor(
    public readonly list: ListService,
    public  matDialog: MatDialog,
    private documentService: DocumentService,
    private configService:ConfigStateService,


  ) { }

  documentData:DocumentDto;
  userId;
  
  
  ngOnInit(): void {
    this.userId = this.configService.getAll().currentUser.id;

    this.getList();

    // Draft = 0,
    // UnderReview = 1,
    // Accepted = 2,
    // ReturnToCreator = 3,
    // Approved = 4,
    // Published = 5,
    // Acknowledgment = 6,
    // Implemented = 7,
    // UnderMonitoring = 8,
    // Retired = 9,


    // creationTime
    // creatorId
    // creatorName
    // id
    // notes
    // status

    this.actionsLog = [...this.documentData.actionsLog]

    let actionObj;
    if(this.documentData.status == DocumentStatus.Draft) {
      let canSendToReviewr = false;
      if(this.documentData.creatorId == this.userId) {
        canSendToReviewr = true;
      } else if( this.documentData.owners.find(item => item.id == this.userId) ) {
        canSendToReviewr = true;
      }

      if(canSendToReviewr) {
        console.log('yeah can add');
       'sendForRevisionById'
      //  actionObj = {
      //   creationTime
      //   creatorId
      //   creatorName
      //   id
      //   notes
      //   status
      //  }
      }
    } else {
      let row
      if(this.documentData.status == DocumentStatus.UnderReview || this.documentData.status == DocumentStatus.ReturnToCreator) {
        row = this.addRow();
        for(let reviewer of this.documentData.reviewers) {
          if(reviewer.employeeId == this.userId) {
            if(reviewer.isRequired) {
              console.log('is reqiored')
              row.role = DocumentRoles.RequiredReviewr;
              row.requiredFunction = this.documentService.finishUserRevisionById
              row.optionalFunction = this.documentService.sendForRevisionById
              break;
            } else {
              row.role = DocumentRoles.OptionalReviewr;
              row.requiredFunction = this.documentService.finishUserRevisionById
            }
          }
        }
        console.log(row);
      } else if (this.documentData.status == DocumentStatus.Accepted) {
        row = this.addRow();
        for(let approver of this.documentData.approvers) {
          if(approver.employeeId == this.userId) {
            if(approver.isRequired) {
              console.log('is reqiored')
              row.role = DocumentRoles.RequiredApprover;
              row.requiredFunction = this.documentService.finishUserApprovalById
              row.optionalFunction = this.documentService.sendForApprovalById
              break;
            } else {
              row.role = DocumentRoles.OptionalApprover;
              row.requiredFunction = this.documentService.finishUserApprovalById
            }
          }
        }
      }
      if(row) this.actionsLog.push(row)
    }

    this.list.get();
  }

  addRow( ) {
    console.log(this.configService.getAll().currentUser);

    return {
      creationTime:null,
      creatorId:null,
      creatorName: this.configService.getAll().currentUser.name,
      id:this.userId,
      notes:null,
      status:this.documentData.status,
      role:null,
      requiredFunction:null, // means at least finish function 
      optionalFunction:null, // means the approve function
      action:Actions.NoAction
    }
  }

  items;
  totalCount;
  actionsLog
  getList() {
    const streamCreator = (query) => new BehaviorSubject({items:this.actionsLog, totalCount:this.actionsLog.length});
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  
  listS = new BehaviorSubject({
    items:[
      {
        name:'name 1',
        role: 'مراجع',
        action:'موافقة',
        date:'2023/7/25',
        status:1,
        notes:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat'
      },
      {
        name:'name 2',
        role: 'مراجع',
        action:'موافقة',
        date:'2023/7/25',
        status:2,
        notes:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita'
      },
      {
        name:'name 3',
        role: 'مراجع',
        action:'موافقة',
        date:'2023/7/25',
        status:1,
        notes:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita'
      },
      {
        name:'name 4',
        role: 'مراجع',
        action:'موافقة',
        date:'2023/7/25',
        status:1,
        notes:'Lorem ipsum dolor sit amet, consetetur. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita'
      },
      {
        name:'name 5',
        role: 'مراجع',
        action:'موافقة',
        date:'2023/7/25',
        status:1,
        notes:'Lorem ipsum dolor sit amet dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita'
      },
    ],
    totalCount:5
  })

  takeAction(func) {
    func(this.documentData.id).subscribe(r => {
      console.log(r);
    })
  }

  returnToCreator() {
    
  }

}
