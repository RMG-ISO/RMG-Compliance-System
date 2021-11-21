import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ListService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DomainService } from '@proxy/domains';
import { DomainDto } from '@proxy/domains/dtos';

@Component({
  selector: 'app-assessment-control',
  templateUrl: './assessment-control.component.html',
  styleUrls: ['./assessment-control.component.scss'],

})
export class AssessmentControlComponent implements OnInit {
  @ViewChild('table') table: DatatableComponent;

  mainDomains: DomainDto[];
  subDomains: DomainDto[];

  isMainDomains: boolean = true;
  frameworkId: string;
  mainDomainId: string;
  mainDomain: DomainDto;

  constructor(
    public list: ListService,
    private domainService: DomainService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.frameworkId = this.activatedRoute.snapshot.params["frameworkId"];
    this.getDomains()
  }

  getDomains() {
    this.domainService.getListWithoutPaging({ isMainDomain: true, maxResultCount: null }).subscribe((response) => {
      this.mainDomains = response.items;
      this.mainDomainId = response.items[0].id;
      this.getSubDomains();
    });
  }

  getSubDomains() {
    this.domainService.getListWithoutPaging({ mainDomainId: this.mainDomainId, isMainDomain: false, maxResultCount: null }).subscribe(subDomains => {
      this.subDomains = subDomains.items;
    })
  }

}
