import { AuthService } from '@abp/ng.core';
import { PageAlertService, ToasterService } from '@abp/ng.theme.shared';
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  get hasLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  constructor(
    private oAuthService: OAuthService,
    private authService: AuthService,
    private toaster: ToasterService,
    private alertService: PageAlertService 
    ) {}

  login() {
    this.authService.navigateToLogin();
  }

  openToaster() {
    let opts = {
      life: 1000000,
      sticky: false,
      closable: true,
      tapToDismiss: true,
      "position": "top-start"
    } as any;
    this.toaster.success('Message', 'Title', opts);
  }

  openAlert() {
    this.alertService.show({
      type: 'warning',
      message:
        'We will have a service interruption between 02:00 AM and 04:00 AM at October 23, 2023!',
      title: 'Service Interruption',
    })
  }
}
