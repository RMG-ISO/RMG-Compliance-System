import { ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[
    ListService
  ]
})
export class ListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
