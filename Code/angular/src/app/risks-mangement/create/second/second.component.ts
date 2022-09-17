import { Component, Input, OnInit } from '@angular/core';
import { StaticDataService } from '@proxy/StaticData';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {
  @Input('form') form;
  ListMatrix = [
    {id:3,nameEn:'Matrix 3*3',nameAr:'مصفوفة 3*3'},
    {id:4,nameEn:'Matrix 4*4',nameAr:'مصفوفة 4*4'}
  ];

  constructor(
    private staticDataService:StaticDataService,
  ) { }

  ngOnInit(): void {
    this.getList(2, 'likelihood');
    this.getList(5, 'controlAssesment');
  
  }

  controlAssesment;
  likelihood;
  getList(Type, key) {
    this.staticDataService.getList({Type:Type, search:null, maxResultCount:null }).subscribe(r => {
      this[key] = r.items;
    })
  }
}
