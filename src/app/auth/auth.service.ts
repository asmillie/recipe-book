import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, take } from 'rxjs/operators';

import { User } from './user.model';
import { Router } from '@angular/router';
import { AppRepositoryService } from '../data/app-repository.service';
import { environment } from '../../environments/environment';

export interface IFirebaseAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
// TODO: Implement firebase refresh token to keep user logged in
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private FIREBASE_EMAIL_SIGN_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  private FIREBASE_EMAIL_SIGN_UP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

  user: BehaviorSubject<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private repository: AppRepositoryService) {
    this.initUser();
  }

  autoLogin() {
    this.repository.getUser().pipe(
      take(1)
    ).subscribe((user: User) => {
      if (!user || user == null || !user.token || user.token === null) {
        return;
      }

      this.user.next(user);
    });
  }

  loginUser(email: string, password: string): Observable<IFirebaseAuthResponse> {
    return this.http.post<IFirebaseAuthResponse>(
      this.FIREBASE_EMAIL_SIGN_IN_URL + environment.firebaseAPIKey,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError((error: HttpErrorResponse, caught: Observable<IFirebaseAuthResponse>) => {
        return this.handleLoginError(error, email, password);
      }),
      tap((response) => {
        this.handleUserAuthResponse(response);
      })
    );
  }

  createUser(email: string, password: string): Observable<IFirebaseAuthResponse> {
    return this.http.post<IFirebaseAuthResponse>(
      this.FIREBASE_EMAIL_SIGN_UP_URL + environment.firebaseAPIKey,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleSignupError)
    );
  }

  logoutUser() {
    this.user.next(null);
    this.repository.deleteUser();
    this.router.navigateByUrl('/');
  }

  private initUser() {
    this.user = new BehaviorSubject<User>(null);
  }

  private handleUserAuthResponse(response: IFirebaseAuthResponse) {
    const expiryDate = new Date(new Date().getTime() + (+response.expiresIn * 1000));
    const newUser = new User(response.email, response.localId, response.idToken, expiryDate);
    this.user.next(
      newUser
    );
    this.repository.saveUser(newUser);
  }

  private handleLoginError(
    error: HttpErrorResponse,
    email: string,
    password: string): Observable<never> | Observable<IFirebaseAuthResponse> {
    const errorMessage = error.error.error.message;
    // TODO: Remove logging
    console.error(error);

    let returnError = '';
    switch (errorMessage) {
      case 'EMAIL_NOT_FOUND':
        // If user is attempting login but doesn't have account then
        // create user with provided email and password
        return this.createUser(email, password);
      case 'INVALID_PASSWORD':
        returnError = 'Incorrect password';
        break;
      case 'USER_DISABLED':
        returnError = 'User account has been disabled';
        break;
      default:
        returnError = 'An error has occurred, please try again';
    }
    return throwError(returnError);
  }

  private handleSignupError(error: HttpErrorResponse): Observable<never> {
    // TODO: Remove logging
    console.error(error);
    const errorMessage = error.error.error.message;
    let returnError = '';
    switch (errorMessage) {
      case 'EMAIL_EXISTS':
        returnError = 'An account already exists for this email';
        break;
      case 'OPERATION_NOT_ALLOWED':
        returnError = 'User signup is disabled';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        returnError = 'User signup temporarily disabled, please try again later';
        break;
      default:
        returnError = 'An error has occurred, please try again';
    }
    return throwError(returnError);
  }
}
