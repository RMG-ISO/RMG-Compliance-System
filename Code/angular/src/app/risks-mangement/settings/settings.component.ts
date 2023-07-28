import { ListService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { LocalizationService } from '@abp/ng.core';
import { StaticDataService } from '@proxy/static-data';
import { StaticDataDto } from '@proxy/static-data';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers:[ListService]
})
export class settingsComponent implements OnInit {
  FormMode = FormMode;

  items: StaticDataDto[];
  totalCount: number;
  isModalOpen: boolean = false;
  selected = {} as any;
  form: FormGroup;


  constructor(
    public readonly list: ListService,
    public dialog: MatDialog,
    private confirmation: ConfirmationService,
    private localizationService:LocalizationService,
    private staticDataService:StaticDataService,
  ) { }


  ngOnInit(): void {
    this.getList();
    this.getCatogries();
  }

  catsList;
  catsListObj = {};
  getCatogries() {
    this.staticDataService.getTypeStaticData().subscribe(r => {
      this.catsList = r;
      this.catsList.map(item => this.catsListObj[item.id] = item );
    })
  }

  selectedCatId;
  selectionChange(ev, selectedOptions) {
    this.selectedCatId = selectedOptions.selected[0].value;
    this.getList();
  }

  searchVal
  getList() {
    const streamCreator = (query) => this.staticDataService.getListByFilter({ ...query, search: this.searchVal, type:this.selectedCatId });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  delete(model: StaticDataDto) {
    let title = this.localizationService.currentLang.includes('ar') ?  model['nameAr'] : model['nameEn'];

    this.confirmation.warn('::DeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[title]}).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.staticDataService.delete(model.id).subscribe(() => this.list.get());
      }
    });
  }

  openDialog(data: StaticDataDto) {
    this.selected = data;
    this.buildForm();
    this.isModalOpen = true;
  }

  buildForm() {
    this.form = new FormGroup({
      nameAr: new FormControl(null, Validators.required),
      nameEn: new FormControl(null, Validators.required),
      tenantId: new FormControl('1094df5c-4bfa-4fb3-92b5-0de021aa31b1'),
      type: new FormControl(this.selectedCatId, Validators.required),
      id: new FormControl(null)
    })
    this.form.patchValue(this.selected);
  }

  save() {
    if (this.form.invalid) return;

    const request = this.selected?.id ? this.staticDataService.update(this.selected.id, this.form.value) : this.staticDataService.create(this.form.value);
    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

}
