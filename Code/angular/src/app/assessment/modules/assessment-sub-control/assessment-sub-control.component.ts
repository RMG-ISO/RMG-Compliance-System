import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ControlService } from '@proxy/controls';
import { ControlDto } from '@proxy/controls/dtos';
import { SharedStatus } from '@proxy/shared';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-assessment-sub-control',
  templateUrl: './assessment-sub-control.component.html',
  styleUrls: ['./assessment-sub-control.component.scss']
})
export class AssessmentSubControlComponent implements OnInit {

  @ViewChild('table') table: DatatableComponent;


  frameworkId: string;
  mainControlId: string;
  subControls: ControlDto[];
  totalCount: number;

  constructor(
    private controlService: ControlService,
    private activatedRoute: ActivatedRoute

  ) {

  }

  ngOnInit(): void {
    console.log()
    this.frameworkId = this.activatedRoute.snapshot.params["frameworkId"];
    this.mainControlId = this.activatedRoute.snapshot.params["controlId"];
    this.getSubControls();
  }


  getSubControls() {
    this.controlService.getListWithoutPaging(
      {
        mainControlId: this.mainControlId,
        isMainControl: false,
        maxResultCount: null,
        status: SharedStatus.Active
      }).subscribe(subControls => {
        this.subControls = subControls.items;
        this.totalCount = subControls.items.length;
        console.log(subControls.items)
      })
  }

  toggleExpandRow(row) {
    //console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    //console.log('Detail Toggled', event);
  }
}
