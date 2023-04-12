import { ListService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { sharedStatusOptions } from '@proxy/shared';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomainDto } from '@proxy/domains/dtos';
import { DepartmentDto } from '@proxy/departments/dtos';
import { DepartmentService } from '@proxy/departments';
import { DomainService } from '@proxy/domains';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss'],
  providers:[
    ListService
  ]
})
export class DomainsComponent implements OnInit {
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
    console.log(this.activatedRoute);

    this.getList();
    this.departmentService.getDepartmentListLookup().subscribe(r => this.departments = r.items);


    console.log(this.activatedRoute.snapshot.params)

    this.frameworkId = this.activatedRoute.snapshot.params["frameworkId"] || this.router.url.split("/")[2];
    this.isMainDomains = this.activatedRoute.snapshot.data["isMainDomains"];
    this.mainDomainId = this.activatedRoute.snapshot.params["mainDomainId"];

    console.log('this.frameworkId', this.frameworkId)
    this.getMainDomain();
    console.log(this.router.url)

    // this.router.events
    // .pipe(
    //   filter((event) => event instanceof NavigationEnd),
    //   map(() => this.activatedRoute),
    //   map((route) => {
    //     console.log('route pre-while: ', route); // Shows ActivatedRoute object
    //     console.log('pre-while route child: ', route.firstChild); // null
    //     while (route.firstChild) {
    //       console.log('while route: ', route);
    //       route = route.firstChild; // Conditional if needed in scenario
    //     }
    //     console.log('post while route: ', route);
    //     return route;
    //   })
    // )
    // .subscribe((elem) => {
    //     console.log('elem: ', elem);
    // });

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
      if (ev.type === 'click') this.router.navigate(['frameworks', this.frameworkId, 'main-domains', ev.row.id, 'sub-domains']);
    }
    else {
      console.log('frameworks', this.frameworkId, 'main-domains', this.mainDomainId, 'sub-domains', ev.row.id, 'main-controls')
      if (ev.type === 'click') this.router.navigate(['frameworks', this.frameworkId, 'main-domains', this.mainDomainId, 'sub-domains', ev.row.id, 'main-controls']);
    }
  }

  openDialog(data: DomainDto) {
    this.selected = data;
    this.buildForm();
    this.isModalOpen = true;
  }

  selectedTable = [];
  onSelect({ selected }) {

    this.selectedTable = [];
    if(selected[selected.length - 1]) this.selectedTable.push(selected[selected.length - 1]);

    console.log('Select Event', selected, this.selectedTable);

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
