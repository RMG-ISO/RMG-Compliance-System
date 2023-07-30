import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SubscriptionService } from '@proxy/subscriptions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionGuard implements CanActivate {
  constructor(private service : SubscriptionService,
    private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.service.getSubscriptionDate().subscribe(result => {
      if (Date.parse(result.startDate) >= Date.now() || Date.parse(result.endDate) <= Date.now())
        return true;
    })
    this.router.navigateByUrl('/subscription');
    return false;
  }
  
}
