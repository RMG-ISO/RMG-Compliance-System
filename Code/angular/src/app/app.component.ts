import { ConfigStateService, ReplaceableComponentsService } from '@abp/ng.core';
import { Component, Inject } from '@angular/core';
import { eThemeBasicComponents } from 'projects/theme-basic/src/lib/enums';
import { ComplianceLayoutComponent } from './compliance-layout/compliance-layout.component';
import { LocalizationService } from '@abp/ng.core';
import { SignalrService } from '@proxy/signalrService';
import { NotifyUserDto } from '@proxy/notifications/dtos';
import { NotificationService } from '@proxy/notifications';
import { RegisteredIcons } from './registered-icons';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { PermissionManagementComponent } from './permission-management/permission-management.component';
import { ePermissionManagementComponents } from '@abp/ng.permission-management';
import { eIdentityComponents, RolesComponent } from '@abp/ng.identity';
import { MyRolesComponent } from './my-roles/my-roles.component';
import { IdentityRoleDto, IdentityRoleService } from '@abp/ng.identity/proxy';
import { DOCUMENT } from '@angular/common';
import { RoutesService } from '@abp/ng.core';
import { ExpiredSubscriptionComponent } from './subscription/expired-subscription/expired-subscription.component';

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
  private themeWrapper = document.querySelector('body');

  constructor (
    private replaceableComponent: ReplaceableComponentsService,
    private localizationService:LocalizationService,
    private matIconRegistry:MatIconRegistry,
    private domSanitizer:DomSanitizer,
    @Inject(DOCUMENT) private document: Document,
    private routerService : RoutesService,
    private config : ConfigStateService
  ){
    if( this.localizationService.currentLang == 'ar-EG') {
      document.body.dir = 'rtl';
      this.loadStyle('bootstrap-rtl.css')
    } else this.loadStyle('bootstrap.css')


    this.replaceableComponent.add({
      component: ComplianceLayoutComponent,
      key: eThemeBasicComponents.ApplicationLayout,
    });


    this.replaceableComponent.add({
      component: PermissionManagementComponent,
      key: ePermissionManagementComponents.PermissionManagement,
    });

    this.replaceableComponent.add({
      component: MyRolesComponent,
      key: eIdentityComponents.Roles,
    });



    if(!this.config.getGlobalFeatureIsEnabled("FrameworkManagment")) {
      this.routerService.remove(['::Menu:Frameworks'])
    }
    /* this.themeWrapper.style.setProperty(
      '--main-green','#fafc22'
    ); */

    for(let icon of RegisteredIcons) {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
      );
    }
  }



  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];
    const style = this.document.createElement('link');
    style.id = 'client-theme';
    style.rel = 'stylesheet';
    style.href = `${styleName}`;
    head.prepend(style);
  }

}
