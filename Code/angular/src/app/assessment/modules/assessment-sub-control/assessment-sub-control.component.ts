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
  mainControl: ControlDto;
  totalCount: number;

  constructor(
    private controlService: ControlService,
    private activatedRoute: ActivatedRoute

  ) {

  }

  ngOnInit(): void {
    this.frameworkId = this.activatedRoute.snapshot.params["frameworkId"];
    this.mainControlId = this.activatedRoute.snapshot.params["controlId"];
    this.getMainControl();
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
      })
  }


  getMainControl() {
    this.controlService.get(this.mainControlId).subscribe(mainControl => {
      this.mainControl = mainControl;
      console.log(mainControl)
    });
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
  }
}
