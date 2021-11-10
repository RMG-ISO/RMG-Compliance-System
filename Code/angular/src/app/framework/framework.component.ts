import { FrameworkService } from './../proxy/frameworks/framework.service';
import { ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from '../shared/interfaces/form-mode';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Router } from '@angular/router';
import { sharedStatusOptions } from '@proxy/shared';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrameworkDto } from '@proxy/frameworks/dtos';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.scss']
})
export class FrameworkComponent implements OnInit {
  FormMode = FormMode;
  sharedStatusOptions = sharedStatusOptions;
  items: FrameworkDto[];
  totalCount: number;
  isModalOpen: boolean = false;
  selected;
  form: FormGroup;

  constructor(
    public readonly list: ListService,
    private frameworkService: FrameworkService,
    public dialog: MatDialog,
    private confirmation: ConfirmationService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.getList();
  }

  getList(search = null) {
    const streamCreator = (query) => this.frameworkService.getList({...query, search});
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }




  delete(id: string) {
    this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.frameworkService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  activate(ev) {
    if (ev.type === 'click') this.router.navigate(['/framework', ev.row.id])
  }




  openDialog(data: FrameworkDto) {
    this.selected = data;
    this.buildForm();
    this.isModalOpen = true;
  }


  buildForm() {
    this.form = new FormGroup({
      nameAr: new FormControl(null, Validators.required),
      nameEn: new FormControl(null, Validators.required),
      shortcutAr: new FormControl(null, Validators.required),
      shortcutEn: new FormControl(null, Validators.required),
      descriptionAr: new FormControl(null, Validators.required),
      descriptionEn: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      id: new FormControl(null)
    })
    this.form.patchValue(this.selected);
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selected.id
      ? this.frameworkService.update(this.selected.id, this.form.value)
      : this.frameworkService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

}
