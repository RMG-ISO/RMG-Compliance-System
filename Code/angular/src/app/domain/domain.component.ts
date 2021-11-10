import { DomainService } from '../proxy/domains/domain.service';
import { ListService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from '../shared/interfaces/form-mode';
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
  styleUrls: ['./domain.component.scss']
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
  framewoks: FrameworkDto[];
  isMainDomains: boolean;
  frameworkId: string;
  mainDomainId: string;



  constructor(
    public readonly list: ListService,
    private domainService: DomainService,
    public dialog: MatDialog,
    private confirmation: ConfirmationService,
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

    console.log(this.activatedRoute.snapshot.params['frameworkId']);
    console.log(this.activatedRoute.snapshot.data["mainDomains"]);

  }

  getList() {
    const bookStreamCreator = (query) => this.domainService.getList({...query,isMainDomain:this.isMainDomains});
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  delete(id: string) {
    this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.domainService.delete(id).subscribe(() => this.list.get());
      }
    });
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
      descriptionAr: new FormControl(null, Validators.required),
      descriptionEn: new FormControl(null, Validators.required),
      reference: new FormControl(null, Validators.required),
      departmentId: new FormControl(null, Validators.required),
      frameworkId: new FormControl(this.frameworkId, Validators.required),
      status: new FormControl(this.frameworkId, Validators.required),
      parentId: new FormControl(this.isMainDomains ? null : this.mainDomainId, this.isMainDomains ? null : Validators.required),
    })
    this.form.patchValue(this.selected);
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selected?.id
      ? this.domainService.update(this.selected.id, this.form.value)
      : this.domainService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

}
