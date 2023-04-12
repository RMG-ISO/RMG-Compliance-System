import { ListService, LocalizationService, SessionStateService } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FrameworkService } from '@proxy/frameworks';
import { FrameworkDto } from '@proxy/frameworks/dtos';
import { sharedStatusOptions } from '@proxy/shared';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-frameworks-list',
  templateUrl: './frameworks-list.component.html',
  styleUrls: ['./frameworks-list.component.scss'],
  providers:[ListService]
})
export class FrameworksListComponent implements OnInit {
  @ViewChild('formDirective') formDirective;
  @ViewChild('dialog') dialog;

  FormMode = FormMode;
  sharedStatusOptions = sharedStatusOptions;
  items: FrameworkDto[];
  totalCount: number;
  isModalOpen: boolean = false;
  selected: FrameworkDto;
  form: FormGroup;

  visibleContent:string = 'grid';

  constructor(
    public readonly list: ListService,
    private frameworkService: FrameworkService,
    public  matDialog: MatDialog,
    private confirmation: ConfirmationService,
    private router: Router,
    private localizationService: LocalizationService,
  ) { }


  filterForm:FormGroup;
  ngOnInit(): void {
    this.getList();

    this.filterForm = new FormGroup({
      search:new FormControl(),
      status:new FormControl(null),
    });

    this.filterForm.valueChanges.pipe(
    debounceTime(1000),
    distinctUntilChanged())
    .subscribe(value => {
      this.list.get();
    });
  }

  showFilters = false;
  getList() {
    const streamCreator = (query) => this.frameworkService.getList({ ...query,...this.filterForm.value, });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  delete(model: FrameworkDto) {
    this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [this.localizationService.currentLang.includes('ar') ?  model.nameAr : model.nameEn] }).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.frameworkService.delete(model.id).subscribe( () => this.list.get() );
      }
    });
  }

  activate(ev) {
    // if (ev.type === 'click') this.router.navigate(['framework', ev.row.id, 'main-domains']);
    if (ev.type === 'click') this.router.navigate(['frameworks', ev.row.id]);
  }


  openDialog(data = null, mode = FormMode.Create) {
    console.log('mocee', mode)
    let ref = this.matDialog.open(this.dialog, {
      data:{
        data,
        mode
      }
    });
    ref.afterClosed().subscribe(con => {
      if(con) this.list.get();
    })
  }



}
