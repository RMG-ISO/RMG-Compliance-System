import { ConfigStateService, ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentService, DocumentStatus } from '@proxy/Documents';
import { DocumentDto } from '@proxy/Documents/dtos';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-revision-approve',
  templateUrl: './revision-approve.component.html',
  styleUrls: ['./revision-approve.component.scss'],
  providers:[ListService]
})
export class RevisionApproveComponent implements OnInit {
  DocumentStatus = DocumentStatus;

  constructor(
    public readonly list: ListService,
    public  matDialog: MatDialog,
    private documentService: DocumentService,
    private configService:ConfigStateService,


  ) { }

  documentData:DocumentDto;
  userId
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
    }
    
  }

  items;
  totalCount;
  getList() {
    const streamCreator = (query) => this.listS;
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

  takeAction(funcName) {
    this.documentService[funcName](this.documentData.id).subscribe(r => {
      console.log(r);
    })
  }
}
