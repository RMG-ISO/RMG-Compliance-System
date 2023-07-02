import {
  AuthService,
  ConfigStateService,
  CurrentUserDto,
  LanguageInfo,
  NAVIGATE_TO_MANAGE_PROFILE,
  SessionStateService,
} from '@abp/ng.core';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService, Status } from '@proxy/notifications';
import { NotifyUserDto } from '@proxy/notifications/dtos';
import { SignalrService } from '@proxy/signalrService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import snq from 'snq';
import { environment } from 'src/environments/environment.prod';
import { AbpOAuthService } from '@abp/ng.oauth';

@Component({
  selector: 'abp-current-user',
  templateUrl: './current-user.component.html',
  styleUrls:['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {
  currentUser$: Observable<CurrentUserDto> = this.configState.getOne$('currentUser');
  selectedTenant$ = this.sessionState.getTenant$();
  Status = Status;
  get smallScreen(): boolean {
    return window.innerWidth < 992;
  }

  constructor(
    @Inject(NAVIGATE_TO_MANAGE_PROFILE) public navigateToManageProfile,
    private authService: AbpOAuthService,
    private configState: ConfigStateService,
    private sessionState: SessionStateService,
    private notificationService:NotificationService,
    private signalrService:SignalrService,
    private router:Router
  ) {}

  notificationItems;
  notificationItemsCount = 0;
  ngOnInit(): void {
    this.signalrService.initiateSignalrConnection();
    this.signalrService.connection.on('ReceiveNotification', (result: NotifyUserDto) => {
      // console.log("ReceiveNotification",result);
      // this.notificationItems = result.notifications;
      // this.notificationItemsCount = result.unReadNotifications;
      this.setNotifications(result)
    });

    this.signalrService.initiateSignalrConnection().then(x => {
      this.signalrService.connection.on('ReceiveNotification', (result: NotifyUserDto) => {
        console.log("ReceiveNotification",result);
        // this.notificationItems = result.notifications;
        // this.notificationItemsCount = result.unReadNotifications;
        this.setNotifications(result)
      });
    })
    // this.signalrService.configureConnection()


    this.notificationService.getCurrentUserNotification().subscribe((result: NotifyUserDto) => {
      console.log("result of getCurrentUserNotification",result);
      // this.notificationItems = result.notifications;
      // this.notificationItemsCount = result.unReadNotifications;
      this.setNotifications(result)
    });
  }

  setNotifications(list) {
    this.notificationItems = list.notifications.map(item => {
      let index = item.url.indexOf(environment.application.baseUrl);
      if(index > -1) item.url = item.url.substring(environment.application.baseUrl.length );
      return item
    });
    this.notificationItemsCount = list.unReadNotifications;
  }


  markAsRead(item, index) {
    if(item.status == Status.NotSeen) this.notificationService.markAsSeenById(item.id).subscribe(r => {
      this.notificationItems[index].status = Status.Seen;
      --this.notificationItemsCount;
    })
    this.router.navigate([item.url])
  }

  navigateToLogin() {
    this.authService.navigateToLogin();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/account/login'])
    });
  }


  languages$: Observable<LanguageInfo[]> = this.configState.getDeep$('localization.languages');

  get defaultLanguage$(): Observable<string> {
    return this.languages$.pipe(
      map(
        languages =>
          snq(
            () => languages.find(lang => lang.cultureName === this.selectedLangCulture).displayName,
          ),
        '',
      ),
    );
  }

  get dropdownLanguages$(): Observable<LanguageInfo[]> {
    // this.languages$.subscribe(r => console.log(r))
    return this.languages$.pipe(
      map(
        languages =>
          snq(() => languages.filter(lang => lang.cultureName !== this.selectedLangCulture)),
        [],
      ),
    );
  }

  get selectedLangCulture(): string {
    return this.sessionState.getLanguage();
  }


  onChangeLang(cultureName: string) {
    this.sessionState.setLanguage(cultureName);
    window.location.reload();
  }

}
