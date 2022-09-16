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
    private authService: AuthService,
    private configState: ConfigStateService,
    private sessionState: SessionStateService,
    private notificationService:NotificationService,
    private signalrService:SignalrService,
    private router:Router
  ) {}

  notificationItems;
  notificationItemsCount = 0;
  ngOnInit(): void {
    this.signalrService.initiateSignalrConnection().then(x => {
      this.signalrService.connection.on('ReceiveNotification', (result: NotifyUserDto) => {
        this.notificationItems = result.notifications;
        this.notificationItemsCount = result.unReadNotifications;
      });
    })
    // this.signalrService.configureConnection()
 

    this.notificationService.getCurrentUserNotification().subscribe((result: NotifyUserDto) => {
      console.log(result);
      this.notificationItems = result.notifications;
      this.notificationItemsCount = result.unReadNotifications;
    });
  }


  markAsRead(item, index) {
    if(item.status == Status.NotSeen) this.notificationService.markAsSeenById(item.id).subscribe(r => {
      this.notificationItems[index].status = Status.Seen
    })
    this.router.navigate([item.url])
  }

  navigateToLogin() {
    this.authService.navigateToLogin();
  }

  logout() {
    this.authService.logout().subscribe();
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
