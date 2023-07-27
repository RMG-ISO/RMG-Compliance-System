import { ConfigStateService, ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionLogType, DocumentService, DocumentStatus } from '@proxy/Documents';
import { DocumentActionLogDto, DocumentDto } from '@proxy/Documents/dtos';
import { BehaviorSubject } from 'rxjs';

enum DocumentRoles {
  Creator = "Creator",
  Owner = "Owner",
  RequiredReviewr = "RequiredReviewr",
  OptionalReviewr = "OptionalReviewr",
  RequiredApprover = "RequiredApprover",
  OptionalApprover = "OptionalApprover",
}

// enum Actions {
//   NoAction = "NoAction",
//   ReturnToCreator = "ReturnToCreator",
//   Approve = "Approve",
//   Finish = "Finish"
// }

@Component({
  selector: 'app-revision-approve',
  templateUrl: './revision-approve.component.html',
  styleUrls: ['./revision-approve.component.scss'],
  providers:[ListService]
})
export class RevisionApproveComponent implements OnInit {
  DocumentStatus = DocumentStatus;
  ActionLogType = ActionLogType;
  
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

    if(this.actionsLog.length) {
      let startStatus = this.actionsLog[this.actionsLog.length - 1].status,
          onlyVisibleActions = [];
      for(let i = this.actionsLog.length - 1; i >= 0; i--) {
        if(this.actionsLog[i].status !== startStatus ) {
          break;
        } else {
          onlyVisibleActions.unshift(this.actionsLog[i]);
          if(this.actionsLog[i].creatorId == this.userId) {

          }
        }
      }
      console.log('onlyVisibleActions', onlyVisibleActions);
    }
    
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
              row.requiredFunction = this.documentService.finishUserRevisionByIdAndInput
              row.optionalFunction = this.documentService.sendForRevisionByIdAndInput
              break;
            } else {
              row.role = DocumentRoles.OptionalReviewr;
              row.requiredFunction = this.documentService.finishUserRevisionByIdAndInput
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
              row.requiredFunction = this.documentService.finishUserApprovalByIdAndInput
              row.optionalFunction = this.documentService.sendForApprovalByIdAndInput
              break;
            } else {
              row.role = DocumentRoles.OptionalApprover;
              row.requiredFunction = this.documentService.finishUserApprovalByIdAndInput
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
      action:ActionLogType.NoAction
    }
  }

  items;
  totalCount;
  actionsLog:DocumentActionLogDto[]
  getList() {
    const streamCreator = (query) => new BehaviorSubject({items:this.actionsLog, totalCount:this.actionsLog.length});
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  
  takeAction(row, func) {
    func(this.documentData.id, {
      role:row.role
    }).subscribe(r => {
      console.log(r);
    })
  }

  returnToCreator(row) {
    this.documentService.returnToCreatorByIdAndInput(this.documentData.id, {
      notes:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
      role:row.role
    }).subscribe(r => {
      console.log(r);
    })
  }

}
