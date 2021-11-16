import { ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from '@proxy/departments';
import { DepartmentDto } from '@proxy/departments/dtos';
import { DomainService } from '@proxy/domains';
import { DomainDto } from '@proxy/domains/dtos';
import { FrameworkService } from '@proxy/frameworks';
import { FrameworkDto } from '@proxy/frameworks/dtos';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit {
  items: DomainDto[];
  totalCount: number;
  departments: DepartmentDto[];
  framewoks: FrameworkDto[];
  isMainDomains: boolean;
  frameworkId: string;
  mainDomainId: string;
  mainDomain: DomainDto;


  constructor(
    public readonly list: ListService,
    private domainService: DomainService,
    public dialog: MatDialog,
    private router: Router,
    private departmentService: DepartmentService,
    private frameworktService: FrameworkService,
    private activatedRoute: ActivatedRoute
  ) {
  }


  ngOnInit(): void {
    this.getList();
    this.departmentService.getDepartmentListLookup().subscribe(r => this.departments = r.items);
    this.frameworktService.getFrameworkListLookup().subscribe(r => this.framewoks = r.items);


    this.frameworkId = this.activatedRoute.snapshot.params["frameworkId"];
    this.isMainDomains = this.activatedRoute.snapshot.data["mainDomains"];
    this.mainDomainId = this.activatedRoute.snapshot.params["mainDomainId"];

    this.getMainDomain();
  }

  getList(search = null) {
    const bookStreamCreator = (query) => this.domainService.getList({ ...query, isMainDomain: this.isMainDomains, search: search, mainDomainId: this.mainDomainId });
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }


  activate(ev) {
    if (this.isMainDomains) {
      if (ev.type === 'click') this.router.navigate(['framework', this.frameworkId, 'main-domains', ev.row.id, 'sub-domains']);
    }
    else {
      if (ev.type === 'click') this.router.navigate(['framework', this.frameworkId, 'main-domains', this.mainDomainId, 'sub-domains', ev.row.id, 'main-controls']);
    }
  }



  getMainDomain() {
    if (!this.isMainDomains) {
      this.domainService.get(this.mainDomainId).subscribe(domain => {
        this.mainDomain = domain;
      })
    }
  }
}
