import { ListService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from '@proxy/documents';
import { DocumentDto } from '@proxy/documents/dtos';
import { LocalizationService } from '@abp/ng.core';
import { saveAs } from 'file-saver';
import { AttachmentService } from '@proxy/attachments';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  providers:[ListService]
})
export class DocumentsComponent implements OnInit {
  FormMode = FormMode;
  items: any[];
  totalCount: number;
  isModalOpen: boolean = false;
  selected;
  form: FormGroup;

  visibleContent:string = 'grid';

  constructor(
    private documentService:DocumentService,
    public readonly list: ListService,
    private confirmation: ConfirmationService,
    private localizationService:LocalizationService,
    private attachmentService: AttachmentService,

  ) { }


  catsList;
  ngOnInit(): void {
    this.getCatogries();

    this.getList();
  }


  getCatogries(search = null) {
    this.documentService.getAllCategories().subscribe(r => {
      this.catsList = r.items;
    })
  }

  searchVal
  extensionsIcons = {
    '.pdf':'fa-file-pdf',
    '.word':'fa-file-pdf',
    '.xlsx':'fa-file-excel',
    '.docx':'fa-file-word',
    '.png':'fa-file-image',
    '.jpg':'fa-file-image',
  };

  calcPrecent(p) {
    if(p <= 50) return '#03BB71';
    else if (p > 50 &&  p < 80) return '#FDC547';
    else return '#D3392F'
  }

  getList() {
    const streamCreator = (query) => this.documentService.getList({ ...query, search: this.searchVal, CategoryId:this.selectedCatId });
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      response.items.map(item => {
        let split = item['attachment'].creator.name;
        item['attachment'].creator.nameAPP = split[0][0] + "." + split[1][0];

        if(item['attachment'].attachmentFiles[0]) {
          item['attachment'].attachmentFiles[0].sizeRound = +(item['attachment'].attachmentFiles[0].size / 1000000).toFixed(1);
          item['attachment'].attachmentFiles[0].icon =  this.extensionsIcons[item['attachment'].attachmentFiles[0].extention] || 'fa-file';

          item['attachment'].attachmentFiles[0].color = this.calcPrecent(((item['attachment'].attachmentFiles[0].size / 1000000) /  item['attachment'].maxFileSize) *  100);
        }
      });
      this.items = response.items;
      this.totalCount = response.totalCount;
    });
  }

  download(row) {
    this.attachmentService.getDownloadFileByFileId(row.attachment.attachmentFiles[0].id).subscribe(file => {
      saveAs(file, row.attachment.attachmentFiles[0].displayName);
    })
  }


  selectedCatId;
  selectionChange(ev) {
    this.selectedCatId = ev.option.value;
    this.getList();
  }


  delete(model: DocumentDto) {
    let title = model.nameEn;
    this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [title] }).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.documentService.delete(model.id).subscribe(() => this.list.get());
      }
    });
  }

  openDialog(data?: DocumentDto) {
    this.selected = data;
    this.buildForm();
    this.isModalOpen = true;
  }

  buildForm() {
    this.form = new FormGroup({
      titleAr: new FormControl(null, Validators.required),
      titleEn: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required),
      attachmentId: new FormControl(null, Validators.required),
      id: new FormControl(null)
    })
    this.form.patchValue(this.selected);
  }

  OnFileUploaded(attachmentId: string) {
    this.form.controls["attachmentId"].patchValue(attachmentId);
  }

  uploading
  OnFileBeginUpload(beginUpload: boolean) {
    this.uploading = true;
  }

  OnFileEndUpload(endUpload: boolean) {
    this.uploading = false;
  }

  save() {
    if(this.form.invalid) return;
    const request = this.selected?.id ? this.documentService.update(this.selected.id, this.form.value) : this.documentService.create(this.form.value);
    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

}
