import { ReplaceableComponentsService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { eThemeBasicComponents } from 'projects/theme-basic/src/lib/enums';
import { ComplianceLayoutComponent } from './compliance-layout/compliance-layout.component';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent {

  constructor (private replaceableComponent: ReplaceableComponentsService){

    this.replaceableComponent.add({
      component: ComplianceLayoutComponent,
      key: eThemeBasicComponents.ApplicationLayout,
    });

  }
}
