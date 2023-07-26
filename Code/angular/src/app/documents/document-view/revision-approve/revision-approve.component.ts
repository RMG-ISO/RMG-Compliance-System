import { ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-revision-approve',
  templateUrl: './revision-approve.component.html',
  styleUrls: ['./revision-approve.component.scss'],
  providers:[ListService]
})
export class RevisionApproveComponent implements OnInit {

  constructor(
    public readonly list: ListService,
    public  matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getList();
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
}
