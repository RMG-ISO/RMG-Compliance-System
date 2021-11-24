import { ListService } from '@abp/ng.core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ControlDto } from '@proxy/controls/dtos';
import { DomainWithoutPagingDto } from '@proxy/domains/dtos';
import { SharedStatus } from '@proxy/shared';
import { DatatableComponent } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-assessment-sub-domain',
  templateUrl: './assessment-sub-domain.component.html',
  styleUrls: ['./assessment-sub-domain.component.scss'],
  providers: [ListService],

})
export class AssessmentSubDomainComponent implements OnInit {

  @Input() subDomain: DomainWithoutPagingDto;
  @ViewChild('table') table: DatatableComponent;


  items: ControlDto[];
  totalCount: number;
  constructor(
    public list: ListService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getControlsList();
  }

  getControlsList() {

    this.items = this.subDomain.controls.filter(t => t.parentId == null && t.status == SharedStatus.Active);
    this.totalCount = this.items.length;
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
  }

  getLinkForSubControlText(row: ControlDto) {
    let childrenControls = this.subDomain.controls.filter(t => t.parentId == row.id)

    return row.reference + (childrenControls.length > 0 ? ' >' : '')
  }

  getLinkForSubControlLink(row: ControlDto) {
    let childrenControls = this.subDomain.controls.filter(t => t.parentId == row.id)
    this.router.navigate([`/${this.router.url}/${row.id}`]);
  }
}
