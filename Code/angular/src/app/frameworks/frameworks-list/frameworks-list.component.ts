import { ListService, LocalizationService, SessionStateService } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FrameworkService } from '@proxy/frameworks';
import { FrameworkDto } from '@proxy/frameworks/dtos';
import { sharedStatusOptions } from '@proxy/shared';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-frameworks-list',
  templateUrl: './frameworks-list.component.html',
  styleUrls: ['./frameworks-list.component.scss'],
  providers:[ListService]
})
export class FrameworksListComponent implements OnInit {
  @ViewChild('formDirective') formDirective;

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
    public dialog: MatDialog,
    private confirmation: ConfirmationService,
    private router: Router,
    private localizationService: LocalizationService,
  ) { }


  ngOnInit(): void {
    this.getList();
    this.buildForm();
  }

  getList(search = null) {
    const streamCreator = (query) => this.frameworkService.getList({ ...query, search: search });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }




  delete(model: FrameworkDto) {
    this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [this.localizationService.currentLang.includes('ar') ?  model.nameAr : model.nameEn] }).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.frameworkService.delete(model.id).subscribe(() => {
          if(model.id == this.selected?.id) this.setFormData(null);
          this.list.get()
        });
      }
    });
  }

  activate(ev) {
    if (ev.type === 'click') this.router.navigate(['framework', ev.row.id, 'main-domains']);
  }


  setFormData(data: FrameworkDto) {
    this.selected = data;
    this.buildForm();
  }


  buildForm() {
    // this.form = null;
    if(!this.form) this.form = new FormGroup({
        nameAr: new FormControl(null, Validators.required),
        nameEn: new FormControl(null, Validators.required),
        shortcutAr: new FormControl(null, Validators.required),
        shortcutEn: new FormControl(null, Validators.required),
        descriptionAr: new FormControl(null),
        descriptionEn: new FormControl(null),
        status: new FormControl(null, Validators.required),
        id: new FormControl(null)
      });
   

    this.form.patchValue(this.selected);
    console.log(this.selected);
    if(!this.selected) {
      this.form.reset();

      for(let c in this.form.controls) {
        this.form.controls[c].setErrors(null);
        this.form.controls[c].reset();
        this.form.controls[c].markAsPristine();
        this.form.controls[c].markAsUntouched();
        this.form.controls[c].updateValueAndValidity();
    }

      // this.formDirective.resetForm();

      // this.form.markAsPristine();
      // this.form.markAsUntouched();
      // this.form.updateValueAndValidity();

    }

    console.log(this.form);

    console.log('/formDirective', this.formDirective);

  }

  save() {
    console.log(this.form);
    if (this.form.invalid) return;

    const request = this.selected?.id
      ? this.frameworkService.update(this.selected.id, this.form.value)
      : this.frameworkService.create(this.form.value);

    request.subscribe(() => {
      this.setFormData(null)
      this.list.get();
    });
  }
}
