import { ApplicationInfo, EnvironmentService } from '@abp/ng.core';
import { Component } from '@angular/core';

@Component({
  selector: 'abp-logo',
  template: `
    <a class="navbar-brand" routerLink="/">
      <img
        *ngIf="appInfo.logoUrl; else appName"
        [src]="appInfo.logoUrl"
        [alt]="appInfo.name"
        width="100%"
        height="auto"
      />
    </a>

    <ng-template #appName>
      {{ appInfo.name }}
    </ng-template>
  `,
  styles:[
    `
      img{height: 38px;margin-bottom: -4px;}
      .navbar-brand{
        display: inline-block;
        padding-top: 0.3125rem;
        padding-bottom: 0.3125rem;
        margin-right: 1rem;
        margin-left: 1rem;
        font-size: 1.25rem;
        line-height: inherit;
        white-space: nowrap;
      }
    `
  ]
})
export class LogoComponent {
  get appInfo(): ApplicationInfo {
    return this.environment.getEnvironment().application;
  }

  constructor(private environment: EnvironmentService) {}
}
