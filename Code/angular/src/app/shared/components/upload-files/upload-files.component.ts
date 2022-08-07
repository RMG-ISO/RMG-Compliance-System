import { ConfigStateService, LocalizationService, Rest, RestService } from '@abp/ng.core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AttachmentService } from '@proxy/attachments';
import { AttachmentDto } from '@proxy/attachments/dtos';
import * as mime from 'mime';

export interface IFileUploaderErrors {
  fileName: string,
  errors: Array<string>
}


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit, OnChanges {
  radius = 45;
  circumference = this.radius * 2 * Math.PI;


  @Input() attachment: AttachmentDto;
  @Output() OnUpload: EventEmitter<string> = new EventEmitter<string>();
  @Output() OnBeginUpload: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() OnEndUpload: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input('disabled') disabled = false;

  attachmentId: string;
  fileExtentions: string;
  isMultiple: boolean;
  maxFileSize: number;
  acceptedTypes: string;
  fileUploaderErrors: IFileUploaderErrors[];
  progress: number;
  uploading: boolean = false;

  constructor(
    private config: ConfigStateService,
    private attachmentService: AttachmentService,
    private restService: RestService,
    private localizationService: LocalizationService
  ) { }

  ngOnChanges(changes: SimpleChanges) {

    console.log(this.config.getSetting("ComplianceSystem.Attachment.FileExtentions"));

    if (changes["attachment"]) {

      let att = changes["attachment"].currentValue;
      console.log('att', att);
      this.attachmentId = att ? att.id : null;
      this.fileExtentions = att && att.fileExtentions ? att.fileExtentions : this.config.getSetting("ComplianceSystem.Attachment.FileExtentions");
      this.isMultiple = att && att.isMultiple !== undefined ? att.isMultiple : this.config.getSetting("ComplianceSystem.Attachment.IsMultiple").toLowerCase() == 'true';
      this.maxFileSize = att && att.maxFileSize !== undefined ? att.maxFileSize : Number(this.config.getSetting("ComplianceSystem.Attachment.MaxFileSize"));

      let exts = [];
      console.log(this.fileExtentions);
      (this.fileExtentions || '').split(',').forEach(v => {
        exts.push(mime.getType(v));
      });

      this.acceptedTypes = exts.join(',');
    }
  }

  ngOnInit(): void {
    this.attachmentId = this.attachment && this.attachment.id? this.attachment.id : null;
    this.fileExtentions = this.attachment && this.attachment.fileExtentions ? this.attachment.fileExtentions : this.config.getSetting("ComplianceSystem.Attachment.FileExtentions");
    this.isMultiple = this.attachment && this.attachment.isMultiple !== undefined ? this.attachment.isMultiple : this.config.getSetting("ComplianceSystem.Attachment.IsMultiple").toLowerCase() == 'true';
    this.maxFileSize = this.attachment && this.attachment.maxFileSize !== undefined ? this.attachment.maxFileSize : Number(this.config.getSetting("ComplianceSystem.Attachment.MaxFileSize"));

    let exts = [];
    (this.fileExtentions || "").split(',').forEach(v => {
      exts.push(mime.getType(v));
    });

    this.acceptedTypes = exts.join(',');
  }


  handleFileInput(files: FileList, input:HTMLInputElement) {
    this.fileUploaderErrors = [];
    console.log(this.fileUploaderErrors);
    this.checkFiles(files);
    this.OnBeginUpload.emit(true);
    this.uploading = true;
    this.uploadFiles(files, this.attachment)
    .subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          break;
        case HttpEventType.ResponseHeader:
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.OnUpload.emit(event.body);
          this.OnEndUpload.emit(true);
          this.uploading = false;
          this.progress = 0;
          break;

      }

    }, err => {
      this.OnEndUpload.emit(true);
      this.uploading = false;
    });
    input.type = ''
    input.type = 'file'
  }


  private generateFormData(files: FileList) {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file, file.name);
    });
    return formData;
  }

  uploadFiles = (files: FileList, attachment: AttachmentDto) => this.restService
    .request<any, any>(
      {
        method: 'POST',
        url: '/api/app/attachment/upload-files',
        params: {
          // attachmentId: attachment ? attachment.id : null,
          // fileExtentions: attachment ? attachment.fileExtentions : this.config.getSetting("ComplianceSystem.Attachment.FileExtentions"),
          // isMultiple: attachment ? attachment.isMultiple : this.config.getSetting("ComplianceSystem.Attachment.IsMultiple"),
          // maxFileSize: attachment ? attachment.maxFileSize : this.config.getSetting("ComplianceSystem.Attachment.MaxFileSize")

          attachmentId: attachment ? attachment.id : null,
          fileExtentions: this.fileExtentions,
          isMultiple: this.isMultiple,
          maxFileSize: this.maxFileSize
        },
        body: this.generateFormData(files),
        reportProgress: true,
      },
      {
        apiName: this.attachmentService.apiName,
        observe: Rest.Observe.Events
      },

    );

  checkFiles = (files: FileList) => {
    this.fileUploaderErrors = [];
    Array.from(files).forEach(file => {
      console.log(file);
      let fileSizeError = '';
      this.localizationService.get('::AttachmentValidationFileSize', this.maxFileSize.toString()).subscribe(res => {
        fileSizeError = res;
        console.log('AttachmentValidationFileSize', res)
      });
      let fileExtentionError = '';
      this.localizationService.get('::AttachmentValidationFileExtention', this.fileExtentions).subscribe(res => {
        fileExtentionError = res;
        console.log('AttachmentValidationFileExtention', res)

      });;
      let erros: Array<string> = [];
      if (file.size > this.maxFileSize * 1024 * 1024) erros.push(fileSizeError)

      let fileExtention = file.name.substring(file.name.indexOf('.') + 1, file.name.length);
      console.log(this.acceptedTypes);
      if (!this.acceptedTypes.includes(mime.getType(fileExtention))) erros.push(fileExtentionError)
      if (erros.length > 0) this.fileUploaderErrors.push({ fileName: file.name, errors: erros })
    });


    if (this.fileUploaderErrors.length > 0)
      throw Error(JSON.stringify(this.fileUploaderErrors))
  };
}

