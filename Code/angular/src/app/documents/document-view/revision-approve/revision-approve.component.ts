import { ConfigStateService, ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionLogType, DocumentService, DocumentStatus } from '@proxy/documents';
import { DocumentActionLogDto, DocumentDto } from '@proxy/documents/dtos';
import { ColumnMode } from '@swimlane/ngx-datatable';
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
  ColumnMode = ColumnMode;
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
    this.actionsLog = [...this.documentData.actionsLog]

    if(this.actionsLog.length) {
      let indcies = [];
      for(let i = this.actionsLog.length - 1; i >= 0; i--) {
        if(this.actionsLog[i].status !== this.documentData.status ) {
          break;
        } else {
          if(this.actionsLog[i].creatorId == this.userId) {
            indcies.push(i);
          }
        }
      }

      console.log('indcies', indcies);
      if(indcies.length) {
        console.log('getting in elese')
        let currentRow = this.actionsLog[indcies[0]];
        this.addFunctionsAndData(currentRow);
      } else {
        console.log('getting in elese')
        let row = this.addFunctionsAndData(this.addRow());
        if(row.role) this.actionsLog.push(row as any)
      }
    } else {
      let row = this.addFunctionsAndData(this.addRow());
      if(row.role) this.actionsLog.push(row as any)
    }

    this.list.get();
  }

  addFunctionsAndData(row) {
    if(this.documentData.status == DocumentStatus.Draft || this.documentData.status == DocumentStatus.ReturnToCreator) {
      // let canSendToReviewr = false;
      if(this.documentData.creatorId == this.userId) {
        // canSendToReviewr = true;
        row.role = DocumentRoles.Creator;
        row.optionalFunction = this.documentService.sendForRevisionByIdAndInput;
        console.log('row.role')
      } else if( this.documentData.owners.find(item => item.id == this.userId) ) {
        // canSendToReviewr = true;
        row.role = DocumentRoles.Owner;
        row.optionalFunction = this.documentService.sendForRevisionByIdAndInput;
        console.log('row.role')
      }
      console.log('row', row)
    } else {
      if(this.documentData.status == DocumentStatus.UnderReview) {
        console.log('under review')
        for(let reviewer of this.documentData.reviewers) {
          if(reviewer.employeeId == this.userId) {
            if(reviewer.isRequired) {
              console.log('is reqiored')
              row.role = DocumentRoles.RequiredReviewr;
              row.requiredFunction = this.documentService.finishUserRevisionByIdAndInput
              row.optionalFunction = this.documentService.sendForApprovalByIdAndInput
              break;
            } else {
              row.role = DocumentRoles.OptionalReviewr;
              row.requiredFunction = this.documentService.finishUserRevisionByIdAndInput
            }
          }
        }
        console.log(row);
      } else if (this.documentData.status == DocumentStatus.Accepted) {
        for(let approver of this.documentData.approvers) {
          if(approver.employeeId == this.userId) {
            if(approver.isRequired) {
              console.log('is reqiored')
              row.role = DocumentRoles.RequiredApprover;
              row.requiredFunction = this.documentService.finishUserApprovalByIdAndInput
              row.optionalFunction = this.documentService.approveByIdAndInput
              break;
            } else {
              row.role = DocumentRoles.OptionalApprover;
              row.requiredFunction = this.documentService.finishUserApprovalByIdAndInput
            }
          }
        }
      }
    }
    
    return row;
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
      console.log(this.items)
    });
  }

  
  takeAction(row, func) {
    console.log(row)
    console.log(func)
    func(this.documentData.id, {
      role:row.role,
      notes:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
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


/*
 createRow() {
    let row = this.addRow()

    if(this.documentData.status == DocumentStatus.Draft || this.documentData.status == DocumentStatus.ReturnToCreator) {
      // let canSendToReviewr = false;
      if(this.documentData.creatorId == this.userId) {
        // canSendToReviewr = true;
        row.role = DocumentRoles.Creator;
        row.requiredFunction = this.documentService.sendForRevisionByIdAndInput;
        console.log('row.role')
      } else if( this.documentData.owners.find(item => item.id == this.userId) ) {
        // canSendToReviewr = true;
        row.role = DocumentRoles.Owner;
        row.requiredFunction = this.documentService.sendForRevisionByIdAndInput;
        console.log('row.role')
      }
    } else {

      if(this.documentData.status == DocumentStatus.UnderReview) {
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
    }

    if(row.role) this.actionsLog.push(row as any)
  }
*/