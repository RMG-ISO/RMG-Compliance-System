import { documentService } from '../proxy/documents/document.service';
import { ListService, LocalizationService, SessionStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from '../shared/interfaces/form-mode';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Router } from '@angular/router';
import { sharedStatusOptions } from '@proxy/shared';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentDto } from '@proxy/documents/dtos';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  providers:[ListService]
})
export class documentComponent implements OnInit {
  debugger;
  FormMode = FormMode;
  sharedStatusOptions = sharedStatusOptions;
  items: DocumentDto[];
  totalCount: number;
  isModalOpen: boolean = false;
  selected: DocumentDto;
  form: FormGroup;

  visibleContent:string = 'grid';

  constructor(
    public readonly list: ListService,
    private documentService: documentService,
    public dialog: MatDialog,
    private confirmation: ConfirmationService,
    private router: Router,
    private localizationService: LocalizationService,
    private sessionState: SessionStateService,

  ) { }


  ngOnInit(): void {
    this.getList();
  }

  getList(search = null) {
    const streamCreator = (query) => this.documentService.getList({ ...query, search: search });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }




  delete(model: DocumentDto) {
    this.confirmation.warn('::documentDeletionConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [model.TitleAr] }).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.documentService.delete(model.id).subscribe(() => this.list.get());
      }
    });
  }

  activate(ev) {
    if (ev.type === 'click') this.router.navigate(['document', ev.row.id, 'main-domains']);
  }


  openDialog(data: DocumentDto) {
    this.selected = data;
    this.buildForm();
    this.isModalOpen = true;
  }


  buildForm() {

    this.form = new FormGroup({
      TitleAr: new FormControl(null, Validators.required),
      TitleEn: new FormControl(null, Validators.required),
      CategoryId: new FormControl(null, Validators.required),
      AttachmentId: new FormControl(null, Validators.required),
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
