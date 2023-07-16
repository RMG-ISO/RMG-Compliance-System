import { AccountService } from '@abp/ng.account.core/proxy';
import { ConfigStateService, LocalizationService, SessionStateService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { validatePassword } from '@ngx-validate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  isEmailSent = false;
  form;

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
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private configStateService: ConfigStateService,
    private localizationService: LocalizationService,
    private sessionState: SessionStateService
  ) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
    this.currentLang = this.sessionState.getLanguage();
  }

  onChangeLang(cultureName: string) {
    this.sessionState.setLanguage(cultureName);
    window.location.reload();
  }

  inProgress = false;
  onSubmit() {
    if (this.form.invalid) return;
    this.inProgress = true;
    this.accountService
      .sendPasswordResetCode({
        email: this.form.get('email').value,
        appName: 'Angular',
      })
      .pipe(finalize(() => (this.inProgress = false)))
      .subscribe(
        () => {
          console.log('isEmailSent', this.isEmailSent)
          this.isEmailSent = true;
        },
        e => {
          // if (e.status == 403)
          //   setTimeout(
          //     () =>
          //       (document.querySelectorAll('p.message')[0].textContent =
          //         this.localizationService.instant('::ForgotPasswordInvalidEmail'))
          //   );
        }
      );
  }

  getPasswordValidators() {
    var getRule = this.getRuleFn();
    var passwordRulesArr = [];
    var requiredLength = 1;
    if (getRule('RequireDigit') === 'true') {
      passwordRulesArr.push('number');
    }
    if (getRule('RequireLowercase') === 'true') {
      passwordRulesArr.push('small');
    }
    if (getRule('RequireUppercase') === 'true') {
      passwordRulesArr.push('capital');
    }
    if (getRule('RequireNonAlphanumeric') === 'true') {
      passwordRulesArr.push('special');
    }
    if (Number.isInteger(+getRule('RequiredLength'))) {
      requiredLength = +getRule('RequiredLength');
    }
    return [
      validatePassword(passwordRulesArr),
      Validators.minLength(requiredLength),
      Validators.maxLength(128),
    ];
  }

  getRuleFn() {
    return key => {
      var passwordRules = this.configStateService.getSettings('Identity.Password');
      return (passwordRules['Abp.Identity.Password.' + key] || '').toLowerCase();
    };
  }
}
