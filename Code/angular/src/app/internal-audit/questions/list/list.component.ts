import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { ListService, LocalizationService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrameworkService } from '@proxy/frameworks';
import { InternalAuditQuestionsService } from '@proxy/InternalAuditQuestions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[
    ListService,
  ]
})
export class ListComponent implements OnInit {
  searchVal
  frameworks;
  form:FormGroup;
  isModalOpen;

  constructor(
    public list:ListService,
    private frameworkService:FrameworkService,
    private internalAuditQuestionsService:InternalAuditQuestionsService,
    private confirmation:ConfirmationService,
    private localizationService:LocalizationService
  ) { }

  ngOnInit(): void {
    this.getList();
    this.frameworkService.getList({maxResultCount:null}).subscribe(result => this.frameworks = result.items);
  }

  items;
  totalCount
  getList(search = null) {
    const streamCreator = (query) => this.internalAuditQuestionsService.getList({ ...query, Search: search });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
      console.log(response);
    });
  }

  delete(model) {
    let title = this.localizationService.currentLang.includes('ar') ?  model['questionTextAr'] : model['questionTextEn'];
    this.confirmation.warn('::DeletionConfirmationMessage', '::AreYouSure',{messageLocalizationParams:[title]}).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.internalAuditQuestionsService.delete(model.id).subscribe(() => this.list.get());
      }
    });
  }

  openDialog(data?) {
    this.selected = data;
    this.buildForm();
    this.isModalOpen = true;
  }

  selected;
  buildForm() {
    this.form = new FormGroup({
      questionTextAr: new FormControl(null, Validators.required),
      questionTextEn: new FormControl(null, Validators.required),
      questionExplainAr: new FormControl(null, Validators.required),
      questionExplainEn: new FormControl(null, Validators.required),
      frameworkId: new FormControl(null, Validators.required),
      id: new FormControl(null)
    })
    this.form.patchValue(this.selected);
  }

  save() {
    if (this.form.invalid) return;

    const request = this.selected?.id
      ? this.internalAuditQuestionsService.update(this.selected.id, this.form.value)
      : this.internalAuditQuestionsService.create(this.form.value);
    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

}
