import { ReplaceableComponentsService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { eThemeBasicComponents } from 'projects/theme-basic/src/lib/enums';
import { ComplianceLayoutComponent } from './compliance-layout/compliance-layout.component';
import { LocalizationService } from '@abp/ng.core';
import { SignalrService } from '@proxy/signalrService';
import { NotifyUserDto } from '@proxy/notifications/dtos';
import { NotificationService } from '@proxy/notifications';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent {
  notificationItems;
  notificationItemsCount;

  constructor (
    private replaceableComponent: ReplaceableComponentsService,
    private localizationService:LocalizationService,
  ){
    if( this.localizationService.currentLang == 'ar-EG') document.body.dir = 'rtl'
    this.replaceableComponent.add({
      component: ComplianceLayoutComponent,
      key: eThemeBasicComponents.ApplicationLayout,
    });

   
  }
}
