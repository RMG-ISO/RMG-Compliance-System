import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-intercept',
  templateUrl: './error-intercept.component.html',
  styleUrls: ['./error-intercept.component.scss']
})
export class ErrorInterceptComponent implements OnInit {
  errorStatus;
  title;
  content;
  showIcon = true;
  iconName = 'warning';
  iconColor = 'warn'

  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorInterceptComponent) {
    Object.assign(this,data || {})
  }
  ngOnInit(): void {
    console.log(this);
  }

}
