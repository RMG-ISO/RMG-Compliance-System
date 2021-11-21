import { ListService } from '@abp/ng.core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ControlService } from '@proxy/controls';
import { ControlDto } from '@proxy/controls/dtos';
import { DomainDto } from '@proxy/domains/dtos';
import { DatatableComponent } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-assessment-sub-domain',
  templateUrl: './assessment-sub-domain.component.html',
  styleUrls: ['./assessment-sub-domain.component.scss'],
  providers: [ListService],

})
export class AssessmentSubDomainComponent implements OnInit {

  @Input() subDomain: DomainDto;
  @ViewChild('table') table: DatatableComponent;


  items: ControlDto[];
  totalCount: number;
  constructor(
    public list: ListService,
    private controlService: ControlService,

  ) { }

  ngOnInit(): void {
    this.getControlsList()
  }

  getControlsList(search = null) {
    const bookStreamCreator = (query) => this.controlService.getListWithoutPaging({ ...query, isMainControl: true, search: search, domainId: this.subDomain.id });
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      console.log(response)
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
