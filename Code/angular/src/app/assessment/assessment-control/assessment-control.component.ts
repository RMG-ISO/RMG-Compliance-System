import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { ListService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DomainService } from '@proxy/domains';
import { DomainDto } from '@proxy/domains/dtos';
import { ControlService } from '@proxy/controls';

@Component({
  selector: 'app-assessment-control',
  templateUrl: './assessment-control.component.html',
  styleUrls: ['./assessment-control.component.scss']
})
export class AssessmentControlComponent implements OnInit {
  @ViewChild('table') table: DatatableComponent;
  items: DomainDto[];
  totalCount: number;
  isMainDomains: boolean = true;
  frameworkId: string;
  mainDomainId: string;
  mainDomain: DomainDto;


  constructor(
    public readonly list: ListService,
    private domainService: DomainService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private controlService: ControlService,
  ) {
  }

  mainDomainsList:DomainDto[] = [];

  ngOnInit(): void {

    this.frameworkId = this.activatedRoute.snapshot.params["frameworkId"];

    // this.getMainDomain();

    this.getList()
  }

  getList() {
    const bookStreamCreator = (query) => this.domainService.getList({ ...query});
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.mainDomainsList = response.items;
      this.mainDomainId = response.items[0].id;
      this.getSubDomains();
    });
  }


  activate(ev) {
    // this.router.navigate(['compliance', this.frameworkId, 'main-domains', ev.row.id, 'sub-domains']);
    // if (this.isMainDomains) {
    //   if (ev.type === 'click') this.router.navigate(['compliance', this.frameworkId, 'main-domains', ev.row.id, 'sub-domains']);
    // }
    // else {
    //   if (ev.type === 'click') this.router.navigate(['compliance', this.frameworkId, 'main-domains', this.mainDomainId, 'sub-domains', ev.row.id, 'main-controls']);
    // }
  }



  searchValue:string = '';
  doSearch(search:string) {
    this.searchValue = search;
    this.getSubDomains();
  }
  
  requestSub:Subscription
  getSubDomains() {
    if(this.requestSub) this.requestSub.unsubscribe();
    this.requestSub = this.domainService.getList({mainDomainId:this.mainDomainId, isMainDomain:true} as any).subscribe(domain => {
      // this.mainDomain = domain;
      this.getControlsList();
    })
  }

  getControlsList(search = null) {
    const bookStreamCreator = (query) => this.controlService.getList({ ...query, isMainControl: true, search: search });
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

}
