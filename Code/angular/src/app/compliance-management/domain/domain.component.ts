import { Subscription } from 'rxjs';
import { ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DomainService } from '@proxy/domains';
import { DomainDto } from '@proxy/domains/dtos';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit {
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
    private activatedRoute: ActivatedRoute
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
    this.router.navigate(['compliance', this.frameworkId, 'main-domains', ev.row.id, 'sub-domains']);
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
    this.requestSub = this.domainService.get(this.mainDomainId).subscribe(domain => {
      this.mainDomain = domain;
    })
  }
}
