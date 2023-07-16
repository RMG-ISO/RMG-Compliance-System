import { AuthService, ConfigStateService, SessionStateService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { Component, InjectionToken, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AbpOAuthService } from '@abp/ng.oauth';
import snq from 'snq';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isSelfRegistrationEnabled = true;
  form: FormGroup;

  constructor(
    private injector: Injector,
    private fb: FormBuilder,
    private toasterService: ToasterService,
    private authService: AuthService,
    private configState: ConfigStateService,
    private activatedRoute:ActivatedRoute,
    private sessionState: SessionStateService,
  ) {
    // this.authWrapperKey = "Account.AuthWrapperComponent" /* AuthWrapper */;
  }

  directions = {
    "ar-EG" : {
      label:'English',
      value:"en-GB"
    },
    "en-GB" : {
      label:'العربية',
      value:"ar-EG"
    },
  }
  currentLang;
  ngOnInit() {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.maxLength(255)]],
      password: [null, [Validators.required, Validators.maxLength(128)]],
      rememberMe: [false],
    });

    this.currentLang = this.sessionState.getLanguage();
    console.log('in login')
  }
 
  onChangeLang(cultureName: string) {
    this.sessionState.setLanguage(cultureName);
    window.location.reload();
  }



  inProgress = false;
  onSubmit() {
    if (this.form.invalid) return;
    this.inProgress = true;
    const { username, password, rememberMe } = this.form.value;
    const redirectUrl = this.getRedirectUrl();
    this.authService
      .login({ username, password, rememberMe, redirectUrl })
      .pipe(
        catchError(err => {
          this.toasterService.error(
            snq(() => err.error.error_description) ||
              snq(() => err.error.error.message, 'AbpAccount::DefaultErrorMessage'),
            'Error',
            { life: 7000 }
          );
          return throwError(err);
        }),
        finalize(() => (this.inProgress = false))
      )
      .subscribe();
  }

  getRedirectUrl() {
    return this.activatedRoute.snapshot.queryParams.returnUrl || '/';
  }
}
