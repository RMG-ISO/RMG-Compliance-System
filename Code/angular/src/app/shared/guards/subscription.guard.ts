import { ConfigStateService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SubscriptionService } from '@proxy/subscriptions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionGuard implements CanActivate {
  constructor(private service : SubscriptionService,
    private config :  ConfigStateService,
    private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.config.getGlobalFeatureIsEnabled(route.data.feature))
      {
        return true;
      }
    
    this.router.navigateByUrl('/');
    return false;
  }
  
}
