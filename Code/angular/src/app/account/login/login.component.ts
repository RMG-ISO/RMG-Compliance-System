import { AuthService, ConfigStateService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { Component, InjectionToken, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
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
    private activatedRoute:ActivatedRoute
  ) {
    // this.authWrapperKey = "Account.AuthWrapperComponent" /* AuthWrapper */;
  }
  ngOnInit() {
    this.init();
    this.buildForm();
  }
  init() {
    this.isSelfRegistrationEnabled =
      (this.configState.getSetting('Abp.Account.IsSelfRegistrationEnabled') || '').toLowerCase() !==
      'false';
  }
  buildForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.maxLength(128)]],
      rememberMe: [false],
    });
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
