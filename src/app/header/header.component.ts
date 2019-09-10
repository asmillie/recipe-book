import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean;
  userSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initUserAuth();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  logout() {
    this.authService.logoutUser();
  }

  private initUserAuth() {
    this.isLoggedIn = false;
    this.userSub = this.authService.user.subscribe((user) => {
      if (user && user.token !== null) {
        return this.isLoggedIn = true;
      }

      this.isLoggedIn = false;
    });

  }
}
