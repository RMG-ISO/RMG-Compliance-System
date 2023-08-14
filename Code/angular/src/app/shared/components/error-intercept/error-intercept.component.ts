import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-intercept',
  templateUrl: './error-intercept.component.html',
  styleUrls: ['./error-intercept.component.scss']
})
export class ErrorInterceptComponent implements OnInit {
  errorStatus;
  title:string;
  content;
  showIcon = true;
  iconName = 'warning';
  iconColor = 'warn'

  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorInterceptComponent, private router:Router) {
    Object.assign(this,data || {})
  }

  returnUrl;
  ngOnInit(): void {
    console.log(this);
    if( typeof this.title === 'string') {
      if(this.title.includes('403') || this.title.includes('401')) {
        this.returnUrl = '/home'
      }
    }
  }

  route() {
    if(this.returnUrl) this.router.navigate([this.returnUrl])
  }

}
