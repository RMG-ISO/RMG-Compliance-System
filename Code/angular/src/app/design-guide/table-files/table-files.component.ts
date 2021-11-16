import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-files',
  templateUrl: './table-files.component.html',
  styleUrls: ['./table-files.component.scss']
})
export class TableFilesComponent implements OnInit {
  items = [];
  totalCount;
  attachmentId
  constructor() { }

  ngOnInit(): void {
  }

  OnUpload(data) {
    console.log(data);
    this.attachmentId = data;
    
  }
}
