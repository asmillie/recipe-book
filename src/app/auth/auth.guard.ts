import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy {

  authSubscription: Subscription;

  constructor(
    private authService: AuthService
  ) {}

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      console.log('CanActivate');
      return this.authService.user.pipe(
        map(user => {
          console.log(user);
          return user.token !== null;
        })
      );
  }

}
