import { ConfigStateService, ListService, LocalizationService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionLogType, DocumentService, DocumentStatus } from '@proxy/documents';
import { DocumentActionLogDto, DocumentDto } from '@proxy/documents/dtos';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BehaviorSubject } from 'rxjs';
import { DocumentViewComponent } from '../document-view.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from '@abp/ng.theme.shared';

enum DocumentRoles {
  Creator = "CreatorName",
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
  @ViewChild('notesDialog') notesDialog;
  parent:DocumentViewComponent;

  DocumentStatus = DocumentStatus;
  ActionLogType = ActionLogType;
  ColumnMode = ColumnMode;
  DocumentRoles = DocumentRoles;
  
  actionsMsgs = {
    finishUserApprovalByIdAndInput:'::Actions:FinishUserApproval',
    finishUserRevisionByIdAndInput:'::Actions:FinishUserRevision',
    returnToCreatorByIdAndInput:'::Actions:ReturnToCreatorMSG',
    sendForApprovalByIdAndInput:'::Actions:SendForApproval',
    sendForRevisionByIdAndInput:'::Actions:SendForRevision',
    approveByIdAndInput:"::Actions:Approved"
  }
  constructor(
    public readonly list: ListService,
    public  matDialog: MatDialog,
    private documentService: DocumentService,
    private configService:ConfigStateService,
    private toasterService:ToasterService,
    private localizationService:LocalizationService
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
        // console.log('getting in elese')
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
        // row.optionalFunction = this.documentService.sendForRevisionByIdAndInput;
        row.optionalFunction = 'sendForRevisionByIdAndInput';
        console.log('row.role')
      } else if( this.documentData.owners.find(item => item.id == this.userId) ) {
        // canSendToReviewr = true;
        row.role = DocumentRoles.Owner;
        // row.optionalFunction = this.documentService.sendForRevisionByIdAndInput;
        row.optionalFunction = 'sendForRevisionByIdAndInput';
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
              // row.requiredFunction = this.documentService.finishUserRevisionByIdAndInput
              // row.optionalFunction = this.documentService.sendForApprovalByIdAndInput
              row.requiredFunction = 'finishUserRevisionByIdAndInput'
              row.optionalFunction = 'sendForApprovalByIdAndInput'
              break;
            } else {
              row.role = DocumentRoles.OptionalReviewr;
              // row.requiredFunction = this.documentService.finishUserRevisionByIdAndInput
              row.requiredFunction = 'finishUserRevisionByIdAndInput'
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
              // row.requiredFunction = this.documentService.finishUserApprovalByIdAndInput
              // row.optionalFunction = this.documentService.approveByIdAndInput
              row.requiredFunction = 'finishUserApprovalByIdAndInput'
              row.optionalFunction = 'approveByIdAndInput'

              break;
            } else {
              row.role = DocumentRoles.OptionalApprover;
              // row.requiredFunction = this.documentService.finishUserApprovalByIdAndInput
              row.requiredFunction = 'finishUserApprovalByIdAndInput'
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
      type:ActionLogType.NoAction
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

  actionForm:FormGroup;
  takeAction(row, funcName) {
    console.log(row)
    // console.log(func);
    
    this.actionForm = new FormGroup({
      notes:new FormControl(null),
      role:new FormControl(row.role),
    });

    let dialog = this.matDialog.open(this.notesDialog, {
      disableClose:true
    })

    console.log(this.actionsMsgs);
    console.log(funcName);

    dialog.afterClosed().subscribe(cond => {
      console.log(cond)
      if(!cond) return;

      console.log(this.actionsMsgs[funcName]);


      this.documentService[funcName](this.documentData.id, this.actionForm.value).subscribe(r => {
        this.toasterService.success(this.localizationService.instant(this.actionsMsgs[funcName]));
        this.parent.getDocument();
      });
    })
  }

  returnToCreator(row) {
    this.actionForm = new FormGroup({
      notes:new FormControl(null, Validators.required),
      role:new FormControl(row.role),
    });
    

    let dialog = this.matDialog.open(this.notesDialog, {
      disableClose:true
    })

    dialog.afterClosed().subscribe(cond => {
      if(!cond) return;
      this.documentService.returnToCreatorByIdAndInput(this.documentData.id, this.actionForm.value).subscribe(r => {
        console.log(r);
        this.parent.getDocument();
        this.toasterService.success(this.localizationService.instant(this.actionsMsgs.returnToCreatorByIdAndInput));
      })
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


