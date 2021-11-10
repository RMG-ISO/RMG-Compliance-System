import { ControlService } from '../proxy/controls/control.service';
import { ListService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from '../shared/interfaces/form-mode';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { ActivatedRoute, Router } from '@angular/router';
import { sharedStatusOptions } from '@proxy/shared';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlDto } from '@proxy/controls/dtos';
import { DepartmentDto } from '@proxy/departments/dtos';
import { DepartmentService } from '@proxy/departments';
import { FrameworkDto } from '@proxy/frameworks/dtos';
import { FrameworkService } from '@proxy/frameworks';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  FormMode = FormMode;
  sharedStatusOptions = sharedStatusOptions;
  @ViewChild('dataTable', { static: false }) table: DatatableComponent;


  items: ControlDto[];
  totalCount: number;
  isModalOpen: boolean = false;
  selected: ControlDto;
  form: FormGroup;
  isMainControls: boolean;
  frameworkId: string;
  mainControlId: string;
  mainControl: ControlDto;
  mainDomainId:string;
  subDomainId:string;

  constructor(
    public readonly list: ListService,
    private controlService: ControlService,
    public dialog: MatDialog,
    private confirmation: ConfirmationService,
    private router: Router,
    private departmentService: DepartmentService,
    private frameworktService: FrameworkService,
    private activatedRoute: ActivatedRoute,
  ) {
    
  }


  ngOnInit(): void {
    this.getList();
  

    
    this.frameworkId = this.activatedRoute.snapshot.params["frameworkId"];
    this.mainDomainId = this.activatedRoute.snapshot.params["mainDomainId"];
    this.subDomainId = this.activatedRoute.snapshot.params["subDomainId"];
    this.isMainControls = this.activatedRoute.snapshot.data["mainControls"];
    this.mainControlId = this.activatedRoute.snapshot.params["mainControlId"];
    
    this.getMainControl();
  }

  getList(search = null) {
    const bookStreamCreator = (query) => this.controlService.getList({ ...query, isMainControl: this.isMainControls, search: search, mainControlId: this.mainControlId });
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  delete(model: ControlDto) {
    this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [model.nameAr] }).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.controlService.delete(model.id).subscribe(() => this.list.get());
      }
    });
  }

  activate(ev) {
    if(this.isMainControls)
    if (ev.type === 'click') this.router.navigate(['framework', this.frameworkId, 'main-domains', this.mainDomainId, 'sub-domains', this.subDomainId, 'main-controls',ev.row.id,'sub-controls']);

  }

  openDialog(data: ControlDto) {
    this.selected = data;
    this.buildForm();
    this.isModalOpen = true;
  }

  buildForm() {
    this.form = new FormGroup({
      id: new FormControl(null),
      nameAr: new FormControl(null, Validators.required),
      nameEn: new FormControl(null, Validators.required),
      descriptionAr: new FormControl(null),
      descriptionEn: new FormControl(null),
      reference: new FormControl(null, Validators.required),
      domainId: new FormControl(this.subDomainId, Validators.required),
      status: new FormControl(null, Validators.required),
      parentId: new FormControl(this.isMainControls ? null : this.mainControlId, this.isMainControls ? null : Validators.required),
    })
    this.form.patchValue(this.selected);
  }

  save() {

    if (this.form.invalid) {
      return;
    }

    const request = this.selected?.id
      ? this.controlService.update(this.selected.id, this.form.getRawValue())
      : this.controlService.create(this.form.getRawValue());

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

  getMainControl() {
    if (!this.isMainControls) {
      this.controlService.get(this.mainControlId).subscribe(control => {
        this.mainControl = control;
      })
    }
  }
}
