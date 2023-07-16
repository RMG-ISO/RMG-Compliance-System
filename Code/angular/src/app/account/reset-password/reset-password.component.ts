import { AccountService } from '@abp/ng.account.core/proxy';
import { Component, Injector, OnInit } from '@angular/core';

import { ToasterService, getPasswordValidators } from '@abp/ng.theme.shared';
const PASSWORD_FIELDS$1 = ['password', 'confirmPassword'];
import { comparePasswords } from '@ngx-validate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthService, ConfigStateService, SessionStateService } from '@abp/ng.core';
import { AbpOAuthService } from '@abp/ng.oauth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  inProgress = false;
  isPasswordReset = false;
  form:FormGroup;
  
  mapErrorsFn = (errors, groupErrors, control) => {
    if (PASSWORD_FIELDS$1.indexOf(String(control.name)) < 0) return errors;
    return errors.concat(groupErrors.filter(({ key }) => key === 'passwordMismatch'));
  };

  constructor(
    private injector: Injector,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private sessionState: SessionStateService
  ) {}

  directions = {
    'ar-EG': {
      label: 'English',
      value: 'en-GB',
    },
    'en-GB': {
      label: 'العربية',
      value: 'ar-EG',
    },
  };
  currentLang;
  ngOnInit() {
    this.currentLang = this.sessionState.getLanguage();

    let { userId, resetToken } = this.route.snapshot.queryParams;
    if (!userId || !resetToken) this.router.navigateByUrl('/account/login');
    this.form = this.fb.group(
      {
        userId: [userId, [Validators.required]],
        resetToken: [resetToken, [Validators.required]],
        password: ['', [Validators.required, ...getPasswordValidators(this.injector)]],
        confirmPassword: ['', [Validators.required, ...getPasswordValidators(this.injector)]],
      },
      {
        validators: [comparePasswords(PASSWORD_FIELDS$1)],
      }
    );
  }

  onChangeLang(cultureName: string) {
    this.sessionState.setLanguage(cultureName);
    window.location.reload();
  }


  onSubmit() {
    if (this.form.invalid || this.inProgress) return;
    this.inProgress = true;
    this.accountService
      .resetPassword({
        userId: this.form.get('userId').value,
        resetToken: this.form.get('resetToken').value,
        password: this.form.get('password').value,
      })
      .pipe(finalize(() => (this.inProgress = false)))
      .subscribe(() => {
        this.isPasswordReset = true;
      });
  }
}
