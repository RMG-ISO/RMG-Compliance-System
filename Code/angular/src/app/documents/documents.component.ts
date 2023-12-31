import { ConfigStateService, ListService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { sharedStatusOptions } from '@proxy/shared';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentDto } from '@proxy/departments/dtos';
import { DocumentService, DocumentType, DocumentStatus, documentStatusOptions, documentTypeOptions } from '@proxy/documents';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { EmployeeService } from '@proxy/employees';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '@abp/ng.theme.shared';
import { DocumentDto } from '@proxy/documents/dtos';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  providers:[ListService]

})
export class DocumentsComponent implements OnInit{
  FormMode = FormMode;
  sharedStatusOptions = sharedStatusOptions;
  @ViewChild('dataTable', { static: false }) table: DatatableComponent;


  items: DocumentDto[];
  totalCount: number;
  departments: DepartmentDto[];
  isModalOpen: boolean = false;
  selected = {} as any;
  form: FormGroup;
  allEmployees;
  DocumentStatus = DocumentStatus;
  documentStatusOptions = documentStatusOptions;
  DocumentType = DocumentType;
  documentTypeOptions = documentTypeOptions;
  constructor(
    public readonly list: ListService,
    private documentService: DocumentService,
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private confirmation: ConfirmationService,
    public  activatedRoute:ActivatedRoute,
    private toasterService:ToasterService,
    private configService: ConfigStateService

  ) { }

  documentId;
  userId;
  filterForm;
  showFilters = false;
  ngOnInit(): void {
    this.userId = this.configService.getAll().currentUser.id;
  
    this.filterForm = new FormGroup({
      search:new FormControl(),
      status:new FormControl(this.activatedRoute.snapshot.queryParams.status || null),
      type:new FormControl(),
    });


    this.getList();

    this.filterForm.valueChanges.pipe(
    debounceTime(1000),
    distinctUntilChanged())
    .subscribe(value => {
      this.list.get();
    });

  }

  searchTerm
  getList(search = null) {
    const streamCreator = (query) => this.documentService.getList({...query, ...this.filterForm.value});
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  canEditAndDelete(row: DocumentDto) {
    return row.status !== DocumentStatus.Approved && row.owners.some(o => o.id == this.userId)
  }

  delete(model: DepartmentDto) {
    this.confirmation.warn('::DeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[model.name]}).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.documentService.delete(model.id).subscribe(() => {
          this.list.get();
          this.toasterService.success('::SuccessfullyDeleted', "");
        });
      }
    });
  }

  openDialog(data: DepartmentDto) {
    this.selected = data;
    this.buildForm();
    this.isModalOpen = true;
  }

  buildForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      id: new FormControl(null)
    })
    this.form.patchValue(this.selected);
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selected?.id
      ? this.documentService.update(this.selected.id, this.form.value)
      : this.documentService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

}
