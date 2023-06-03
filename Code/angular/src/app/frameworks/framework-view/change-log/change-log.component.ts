import { ListService } from '@abp/ng.core';
import { Component, Input, OnInit } from '@angular/core';
import { FrameworkStatus } from '@proxy/shared';

@Component({
  selector: 'app-change-log',
  templateUrl: './change-log.component.html',
  styleUrls: ['./change-log.component.scss'],
  providers:[ListService]
})
export class ChangeLogComponent implements OnInit {
  @Input('frameWorkData') frameWorkData;
  
  FrameworkStatus = FrameworkStatus;
  constructor(
    public readonly list: ListService,
  ) { }

  ngOnInit(): void {
  }

}
