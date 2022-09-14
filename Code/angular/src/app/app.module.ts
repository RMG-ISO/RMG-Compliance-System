import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AccountConfigModule } from '@abp/ng.account/config';
import { CoreModule, ListService, SubscriptionService } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { IdentityConfigModule } from '@abp/ng.identity/config';
import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
import { TenantManagementConfigModule } from '@abp/ng.tenant-management/config';
import { ThemeBasicModule } from '@abp/ng.theme.basic';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTE_PROVIDER } from './route.provider';

import { storeLocaleData } from '@abp/ng.core/locale';
import { ComplianceLayoutComponent } from './compliance-layout/compliance-layout.component';
import(
/* webpackChunkName: "_locale-your-locale-js"*/
/* webpackMode: "eager" */
'@angular/common/locales/ar-EG.js'
).then(m => storeLocaleData(m.default, 'ar-EG'));

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';

import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { VALIDATION_BLUEPRINTS } from '@ngx-validate/core';
import { DEFAULT_VALIDATION_BLUEPRINTS } from '@abp/ng.theme.shared';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
    }),
    ThemeSharedModule.forRoot(),
    AccountConfigModule.forRoot(),
    IdentityConfigModule.forRoot(),
    TenantManagementConfigModule.forRoot(),
    SettingManagementConfigModule.forRoot(),
    NgxsModule.forRoot(),
    ThemeBasicModule.forRoot(),
    MatSidenavModule,

    MatExpansionModule,
    MatButtonModule,
    MatMenuModule,

  ],
  declarations: [
    AppComponent,
    ComplianceLayoutComponent,
  ],
  providers: [
    APP_ROUTE_PROVIDER,
    ListService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {
      provide: VALIDATION_BLUEPRINTS,
      useValue: {
        ...DEFAULT_VALIDATION_BLUEPRINTS,
        minLength: "::Validations:MinLength[{{ minLength }}]",
        maxLength: "::Validations:MaxLength[{{ maxLength }}]",
        minToday: '::Validations:MinDateToday',
        minDate:'::Validations:MinDate[{{ minDate }}]',
        maxDate:'::Validations:MaxDate[{{ maxDate }}]',
        lessThanStart: '::Validations:DueDateLessThanStart',
        min: "::Validations:Min[{{ min }}]",
        max: "::Validations:Max[{{ max }}]",
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
