import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '@proxy/frameworks';

@Component({
  selector: 'app-frame-files',
  templateUrl: './frame-files.component.html',
  styleUrls: ['./frame-files.component.scss']
})
export class FrameFilesComponent  {
  frameWorkData;
  parent;

  constructor(
    private frameworkService:FrameworkService,
  ) { }

  OnFileUploaded(attachmentId: string) {
    if(this.frameWorkData.attachmentId) return;

    this.frameWorkData.attachmentId = attachmentId;

    let data = {...this.frameWorkData};

    if (data.frameworkEmpsDto) data.frameworkEmpsDto = data.frameworkEmpsDto.map(emp => {
      return {
        employeeId: emp.employeeId,
        frameworkId: this.frameWorkData?.id ? this.frameWorkData?.id : '00000000-0000-0000-0000-000000000000',
      };
    });
    this.frameworkService.update(this.frameWorkData.id, data).subscribe(r => {
      this.frameWorkData = r;
      this.parent.frameWorkData = r;
    })
  }

  uploading
  OnFileBeginUpload(beginUpload: boolean) {
    this.uploading = true;
  }

  OnFileEndUpload(endUpload: boolean) {
    this.uploading = false;
  }

}
