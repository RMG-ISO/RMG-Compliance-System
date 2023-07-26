import { ListService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { documentService } from '@proxy/documents';
import { DocumentCategoryDto } from '@proxy/documents/dtos';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { LocalizationService } from '@abp/ng.core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers:[ListService]
})
export class CategoriesComponent implements OnInit {
  FormMode = FormMode;


  items: DocumentCategoryDto[];
  totalCount: number;
  isModalOpen: boolean = false;
  selected = {} as any;
  form: FormGroup;
  

  constructor(
    public readonly list: ListService,
    private documentservice: documentService,
    public dialog: MatDialog,
    private confirmation: ConfirmationService,
    private localizationService:LocalizationService
  ) { }


  ngOnInit(): void {
    this.getList();
  }

  getList(search = null) {
    const streamCreator = (query) => this.documentservice.getListCategory({...query, search:search});
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  delete(model: DocumentCategoryDto) {
    let title = this.localizationService.currentLang.includes('ar') ?  model['nameAr'] : model['nameEn'];

    this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[title]}).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.documentservice.deleteCategory(model.id).subscribe(() => this.list.get());
      }
    });
  }

  openDialog(data: DocumentCategoryDto) {
    this.selected = data;
    this.buildForm();
    this.isModalOpen = true;
  }

  buildForm() {
    this.form = new FormGroup({
      nameAr: new FormControl(null, Validators.required),
      nameEn: new FormControl(null, Validators.required),
      tenantId: new FormControl('1094df5c-4bfa-4fb3-92b5-0de021aa31b1'),
      id: new FormControl(null),
    })
    this.form.patchValue(this.selected);
  }

  save() {
    if (this.form.invalid) return;

    const request = this.selected?.id ? this.documentservice.updateCategory(this.selected.id, this.form.value) : this.documentservice.createCategory(this.form.value);
    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

}
