import { LocalizationService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '@proxy/departments';
import { RiskAndOpportunityService } from '@proxy/RiskAndOpportunity';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    private domSanitizer:DomSanitizer
  ) {

  }
  
  frameworksElements;
  frameworksGenerate(elements) {
    this.frameworksElements = this.domSanitizer.bypassSecurityTrustHtml(elements);
  }

  risksElements;
  risksGenerate(elements) {
    this.risksElements = this.domSanitizer.bypassSecurityTrustHtml(elements);
  }


  async generatePrint(frameWorks, risks, button) {
    let style;
    if(document.body.dir === 'rtl' ) {
      style = document.createElement('style');
      style.innerHTML = `*{direction:rtl; text-align:right}` ;
      document.head.appendChild(style);
    }

    await frameWorks.doPrint();
    await risks.doPrint();

    setTimeout(() => {
      button.click();
    }, 500)
  }

  

}




