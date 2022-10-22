import { DomainService } from '../../proxy/domains/domain.service';
import { ListService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from '../../shared/interfaces/form-mode';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { ActivatedRoute, Router } from '@angular/router';
import { sharedStatusOptions } from '@proxy/shared';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomainDto } from '@proxy/domains/dtos';
import { DepartmentDto } from '@proxy/departments/dtos';
import { DepartmentService } from '@proxy/departments';
import { FrameworkDto } from '@proxy/frameworks/dtos';
import { FrameworkService } from '@proxy/frameworks';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss'],
  providers: [ListService]
})
export class DomainComponent implements OnInit {
  FormMode = FormMode;
  sharedStatusOptions = sharedStatusOptions;
  @ViewChild('dataTable', { static: false }) table: DatatableComponent;


  items: DomainDto[];
  totalCount: number;
  isModalOpen: boolean = false;
  selected: DomainDto;
  form: FormGroup;
  departments: DepartmentDto[];
  isMainDomains: boolean;
  frameworkId: string;
  mainDomainId: string;
  mainDomain: DomainDto;


  constructor(
    public readonly list: ListService,
    private domainService: DomainService,
    public dialog: MatDialog,
    private confirmation: ConfirmationService,
    private router: Router,
    private departmentService: DepartmentService,
    private activatedRoute: ActivatedRoute
  ) {
  }


  ngOnInit(): void {
    this.getList();
    this.departmentService.getDepartmentListLookup().subscribe(r => this.departments = r.items);


    this.frameworkId = this.activatedRoute.snapshot.params["frameworkId"];
    this.isMainDomains = this.activatedRoute.snapshot.data["mainDomains"];
    this.mainDomainId = this.activatedRoute.snapshot.params["mainDomainId"];

    this.getMainDomain();
  }

  getList(search = null) {
    const bookStreamCreator = (query) => this.domainService.getList({ ...query, isMainDomain: this.isMainDomains, search: search, mainDomainId: this.mainDomainId, frameworkId: this.frameworkId });
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  delete(model: DomainDto) {
    this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [model.nameAr] }).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.domainService.delete(model.id).subscribe(() => this.list.get());
      }
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

  openDialog(data: DomainDto) {
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
      departmentIds: new FormControl({ value: this.isMainDomains ? null : this.mainDomain.departments.map(t => t.id), disabled: !this.isMainDomains }, Validators.required),
      frameworkId: new FormControl(this.frameworkId, Validators.required),
      status: new FormControl(null, Validators.required),
      parentId: new FormControl(this.isMainDomains ? null : this.mainDomainId, this.isMainDomains ? null : Validators.required),
    })
    if (this.selected) {
      this.form.patchValue(this.selected);
      this.form.get("departmentIds").setValue(this.selected.departments.map(t => t.id));
    }
  }

  save() {

    if (this.form.invalid) {
      return;
    }

    const request = this.selected?.id
      ? this.domainService.update(this.selected.id, this.form.getRawValue())
      : this.domainService.create(this.form.getRawValue());

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

  getMainDomain() {
    if (!this.isMainDomains) {
      this.domainService.get(this.mainDomainId).subscribe(domain => {
        this.mainDomain = domain;
      })
    }
  }
}
