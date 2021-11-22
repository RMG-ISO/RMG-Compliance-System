import { ListService } from '@abp/ng.core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ControlService } from '@proxy/controls';
import { ControlDto } from '@proxy/controls/dtos';
import { DomainDto, DomainWithoutPagingDto } from '@proxy/domains/dtos';
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
  ) { }

  ngOnInit(): void {
    this.getControlsList();
    console.log(this.subDomain)
  }

  getControlsList() {

    this.items = this.subDomain.controls.filter(t=>t.parentId==null);
    this.totalCount = this.items.length;


    // const bookStreamCreator = (query) => this.controlService.getListWithoutPaging({ ...query, isMainControl: true, domainId: this.subDomain.id });
    // this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
    //   //console.log(response)
    //   this.items = response.items;
    //   this.totalCount = response.totalCount;
    // });
  }

  toggleExpandRow(row) {
    //console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    //console.log('Detail Toggled', event);
  }
}
