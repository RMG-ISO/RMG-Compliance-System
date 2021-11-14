import { ConfigStateService, RestService } from '@abp/ng.core';
import { Component, Input, OnInit } from '@angular/core';
import { AttachmentService } from '@proxy/attachments';
import { AttachmentDto } from '@proxy/attachments/dtos';
import * as mimeLite from 'mime/lite';


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  @Input() attachment: AttachmentDto;

  constructor(
    private config: ConfigStateService,
    private attachmentService: AttachmentService,
    private restService: RestService) { }

  ngOnInit(): void {
  }


  handleFileInput(files: FileList) {

    console.log(this.attachment);

    console.log(this.config.getSetting("ComplianceSystem.Attachment.IsMultiple"));
    console.log(this.config.getSetting("ComplianceSystem.Attachment.MaxFileSize"));
    console.log(this.config.getSetting("ComplianceSystem.Attachment.FileExtentions"));

    // let formData = new FormData();
    // let data: IRemoteStreamContent[] = [];
    Array.from(files).forEach(file => {

      // formData.append(file.type, file, file.name)
      // data.push({ contentLength: file.size, contentType: file.type, fileName: file.name })
      console.log(file.type)
      console.log(mimeLite.getExtension(file.type));
      console.log(file.size);

      if (this.attachment) {
      }
      else {

        this.createasd(file).subscribe(result => {
          console.log(result);
        });


      }
    });
  }

  // if (this.attachment) {
  // }
  // else {
  //   // this.attachmentService.uploadFilesByInput(
  //   //   { files: formData,
  //   //      attachmentId: null,
  //   //       fileExtentions: this.config.getSetting("ComplianceSystem.Attachment.FileExtentions"),
  //   //       isMultiple:this.config.getSetting("ComplianceSystem.Attachment.IsMultiple"),
  //   //       maxFileSize:this.config.getSetting("ComplianceSystem.Attachment.MaxFileSize")
  //   //      });



  // this.createasd(file)



  // //  for (let index = 0; index < files.length; index++) {
  // //    const file:File = files[index];

  // //    console.log(file.type)
  // //    console.log(mimeLite.getExtension(file.type));
  // //    console.log(file.size);

  // //    console.log(this.config.getSetting("ComplianceSystem.Attachment.IsMultiple"));
  // //    console.log(this.config.getSetting("ComplianceSystem.Attachment.MaxFileSize"));
  // //    console.log(this.config.getSetting("ComplianceSystem.Attachment.FileExtentions"));
  // //  }

  // }

  private generateFormData(file: File) {
    const formData = new FormData();
    formData.append('files', file, file.name);
    return formData;
  }

  createasd = (file: File) => this.restService
    .request<any, any>(
      {
        method: 'POST',
        ///api/app/attachment/upload-files/{attachmentId}
        url: '/api/app/attachment/upload-files',
        params: {
          attachmentId: '2432eda6-454b-11ec-81d3-0242ac130003',
          fileExtentions: this.config.getSetting("ComplianceSystem.Attachment.FileExtentions"),
          isMultiple: this.config.getSetting("ComplianceSystem.Attachment.IsMultiple"),
          maxFileSize: this.config.getSetting("ComplianceSystem.Attachment.MaxFileSize")

        },
        body: this.generateFormData(file),



      },
      { apiName: this.attachmentService.apiName }
    );
}

