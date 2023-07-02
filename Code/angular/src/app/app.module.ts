import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AccountConfigModule } from '@abp/ng.account/config';
import { CoreModule, ListService, SubscriptionService } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { IdentityConfigModule } from '@abp/ng.identity/config';
import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
import { TenantManagementConfigModule } from '@abp/ng.tenant-management/config';
import { ThemeBasicModule, ValidationErrorComponent } from '@abp/ng.theme.basic';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTE_PROVIDER } from './route.provider';

import { storeLocaleData } from '@abp/ng.core/locale';
import { ComplianceLayoutComponent } from './compliance-layout/compliance-layout.component';

// import(
// /* webpackChunkName: "_locale-your-locale-js"*/
// /* webpackMode: "eager" */
// '@angular/common/locales/ar-EG.js'
// ).then(m => storeLocaleData(m.default, 'ar-EG'));

// import(
// /* webpackChunkName: "_locale-your-locale-js"*/
// /* webpackMode: "eager" */
// '../../node_modules/@angular/common/locales/ar-EG.mjs'
// ).then(m => storeLocaleData(m.default, 'ar-EG'));

import(
  /* webpackChunkName: "_locale-your-locale-js"*/
  /* webpackMode: "eager" */
  '../../node_modules/@angular/common/locales/ar-EG.mjs' ||
    '../../node_modules/@angular/common/locales/en.mjs'
).then(m => storeLocaleData(m.default, 'ar-EG'));

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';

import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { VALIDATION_BLUEPRINTS } from '@ngx-validate/core';
import { DEFAULT_VALIDATION_BLUEPRINTS } from '@abp/ng.theme.shared';
import { MatIconModule } from '@angular/material/icon';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { ErrorInterceptComponent } from './shared/components/error-intercept/error-intercept.component';

import { MatCardModule } from '@angular/material/card';
import { AbpOAuthModule, AbpOAuthService } from '@abp/ng.oauth';
import { OAuthService } from 'angular-oauth2-oidc';
import { of } from 'rxjs';

// export let AppInjector: Injector;

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AbpOAuthModule.forRoot(),
    AppRoutingModule,
    CoreModule.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
    }),
    ThemeSharedModule.forRoot({
      httpErrorConfig: {
        errorScreen: {
          component: ErrorInterceptComponent,
          forWhichErrors: [401, 403, 404, 500],
          hideCloseIcon: true,
        },
      },
    }),
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
    MatIconModule,
    MatCardModule,

    NgxValidateCoreModule.forRoot({
      blueprints: {
        ...DEFAULT_VALIDATION_BLUEPRINTS,
        minLength: '::Validations:MinLength[{{ minLength }}]',
        maxLength: '::Validations:MaxLength[{{ maxLength }}]',
        minToday: '::Validations:MinDateToday',
        minDate: '::Validations:MinDate[{{ minDate }}]',
        maxDate: '::Validations:MaxDate[{{ maxDate }}]',
        lessThanStart: '::Validations:DueDateLessThanStart',
        min: '::Validations:Min[{{ min }}]',
        max: '::Validations:Max[{{ max }}]',
      },
      validateOnSubmit: true,
      targetSelector: '.form-group',
      errorTemplate: ValidationErrorComponent,
      invalidClasses: 'is-invalid',
    }),
  ],
  declarations: [AppComponent, ComplianceLayoutComponent, ErrorInterceptComponent],
  providers: [
    APP_ROUTE_PROVIDER,
    // ListService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    // {
    //   provide: VALIDATION_BLUEPRINTS,
    //   useValue: {
    //     ...DEFAULT_VALIDATION_BLUEPRINTS,
    //     minLength: "::Validations:MinLength[{{ minLength }}]",
    //     maxLength: "::Validations:MaxLength[{{ maxLength }}]",
    //     minToday: '::Validations:MinDateToday',
    //     minDate:'::Validations:MinDate[{{ minDate }}]',
    //     maxDate:'::Validations:MaxDate[{{ maxDate }}]',
    //     lessThanStart: '::Validations:DueDateLessThanStart',
    //     min: "::Validations:Min[{{ min }}]",
    //     max: "::Validations:Max[{{ max }}]",
    //   },
    // },

    {
      provide: AbpOAuthService,
      useValue: {
        hasValidAccessToken: () => true, // return token status
        configure: () => {},
        loadDiscoveryDocument: () => Promise.resolve(),
        events: of(),
        tryLogin: () => {},
        setupAutomaticSilentRefresh: () => {},
        getAccessToken: () => '', // return access token
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  // constructor(private injector: Injector) {
  //   AppInjector = this.injector;
  // }
}

/*
{
  "input": "node_modules/@abp/ng.theme.shared/styles/bootstrap-rtl.min.css",
  "inject": false,
  "bundleName": "bootstrap-rtl.min"
},
*/
