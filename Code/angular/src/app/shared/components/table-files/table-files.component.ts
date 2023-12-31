import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
// import { AttachmentDto, AttachmentFileDto } from './../../proxy/attachments/dtos/models';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { AttachmentService } from '@proxy/attachments';
import { AttachmentDto, AttachmentFileDto } from '@proxy/attachments/dtos/models';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-table-files',
  templateUrl: './table-files.component.html',
  styleUrls: ['./table-files.component.scss']
})
export class TableFilesComponent implements OnInit, OnChanges {
  @Input('title') title = '::Attachments';
  
  items: AttachmentFileDto[] = [];
  totalCount: number;
  @Input('attachmentId') attachmentId: string;
  @Input('disabled') disabled: boolean = false;

  //from file Uploader
  @Output() OnFileUploaded: EventEmitter<string> = new EventEmitter<string>();
  @Output() OnFileBeginUpload: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() OnFileEndUpload: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() OnDeleteFile: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input('attachment') attachment: AttachmentDto;

  constructor(
    private attachmentService: AttachmentService,
    private confirmation: ConfirmationService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.attachmentId) {
      if(changes.attachmentId.currentValue !== changes.attachmentId.previousValue && changes.attachmentId.currentValue !== null) {
        this.getAttachment();
      }
    }
  }

  ngOnInit(): void {
    
  }

  OnUploaded(attachmentId: string) {
    if (!this.attachmentId) {
      this.attachmentId = attachmentId;
    }
    this.getAttachment();

    this.OnFileUploaded.emit(attachmentId);
  }

  OnBeginUpload(beginUpload: boolean) {
    this.OnFileBeginUpload.emit(beginUpload);
  }

  OnEndUpload(endUpload: boolean) {
    this.OnFileEndUpload.emit(endUpload);
    this.getAttachment();
  }

  getAttachment() {
    this.attachmentService.getAttachmentWithFileByAttachmentId(this.attachmentId).subscribe(r => {
      this.attachment = r;
      this.items = r.attachmentFiles
      // .map(file => {
      //   file.size = ~~(file.size/ 1000);
      //   return file
      // })
    })
  }

  delete(row) {
    this.confirmation.warn('::AttachmentFileDeletionConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [row.displayName] }).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.attachmentService.deleteFileByAttachmentIdAndFileId(row.attachmentId, row.id).subscribe(r => {
          this.getAttachment();
          this.OnDeleteFile.emit(row);
        })
      }
    });
  }


  download(row) {
    this.attachmentService.getDownloadFileByFileId(row.id).subscribe(file => {
      saveAs(file, row.displayName);
    })
  }
}
