import { Type } from './../../module.enums';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss'],
})
export class ThirdComponent implements OnInit {
  @Input('form') form;
  @Input('itemData') itemData;
  Type = Type;
  ngOnInit(): void {
  }

  isTreatment;
  IsTreatement(Treatment){
    this.isTreatment = Treatment.value;
  }
}
