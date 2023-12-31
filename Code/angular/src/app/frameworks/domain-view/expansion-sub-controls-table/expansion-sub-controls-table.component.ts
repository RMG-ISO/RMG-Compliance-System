import { ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ControlService } from '@proxy/controls';
import { ControlDto } from '@proxy/controls/dtos';
import { ComplianceStatus } from '@proxy/shared';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-expansion-sub-controls-table',
  templateUrl: './expansion-sub-controls-table.component.html',
  styleUrls: ['./expansion-sub-controls-table.component.scss'],
  providers:[
    ListService
  ]
})
export class ExpansionSubControlsTableComponent implements OnInit {
  @ViewChild('controlDialog') controlDialog;
  
  @Input('subDomainId') subDomainId;
  @Input('mainControl') mainControl;
  @Input('expanded') expanded;
  @Input('frameWorkData') frameWorkData;
  @Input('showButton') showButton;
  @Input('parentPath') parentPath;
  @ViewChild('domainDetailsDialog') domainDetailsDialog;
  
  constructor(
    public readonly list: ListService,
    public  matDialog: MatDialog,
    private confirmation:ConfirmationService,
    private localizationService:LocalizationService,
    private router:Router,
    private controlService: ControlService,

  ) { }

  ngOnInit(): void {
    
  }

  
  isExpanded = false;
  removeButtons
  ngOnChanges(): void {
    if(this.isExpanded) return;
    if(this.expanded) {
      this.isExpanded = true;
      this.getList();
    }
  }


  delete(model: ControlDto) {
    this.confirmation
      .warn('::ControlDeletionConfirmationMessage', '::AreYouSure', {
        messageLocalizationParams: [
          this.localizationService.currentLang.includes('ar') ? model.nameAr : model.nameEn,
        ],
      })
      .subscribe(status => {
        if (status === Confirmation.Status.confirm) {
          this.controlService.delete(model.id).subscribe(() => this.list.get());
        }
      });
  }


  openDialog(data = null) {
    let ref = this.matDialog.open(this.controlDialog, {
      data:{
        data,
        mode:FormMode.Edit,
      }
    });
    ref.afterClosed().subscribe(con => {
      if(con) this.list.get();
    })
  }

  openDomainDetailsDialog(data) {
    console.log(data);
    let ref = this.matDialog.open(this.domainDetailsDialog, {
      data: {
       data
      },
     
    });
    ref.afterClosed().subscribe(con => {
    
    });
  }


  items
  totalCount;
  hasSubControls = true;
  isSet = false;
  getList() {
    const bookStreamCreator = (query) => this.controlService.getList({ ...query, isMainControl: false, mainControlId: this.mainControl.id, domainId: this.subDomainId });
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {

      this.items = response.items;
      this.totalCount = response.totalCount;
      if(!this.isSet) {
        this.hasSubControls = !!response.items.length;
      }
      this.isSet = true;
    });
  }

  activate(ev) {
    if (ev.type === 'click') {
      this.router.navigate(['/', this.parentPath, 'sub-controls', this.frameWorkData.id, this.subDomainId , ev.row.id ])
    }
  }

}
