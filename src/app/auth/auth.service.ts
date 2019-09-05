import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user.model';

export interface IFirebaseAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private FIREBASE_EMAIL_SIGN_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  private FIREBASE_EMAIL_SIGN_UP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  private FIREBASE_WEB_API_KEY = 'AIzaSyBdqNa7ICSXkq-VZ0JG_L1mkwlw3ZgTjY0';

  user = new Subject<User>();

  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string): Observable<IFirebaseAuthResponse> {
    return this.http.post<IFirebaseAuthResponse>(
      this.FIREBASE_EMAIL_SIGN_IN_URL + this.FIREBASE_WEB_API_KEY,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError((error: HttpErrorResponse, caught: Observable<IFirebaseAuthResponse>) => {
        return this.handleLoginError(error, email, password);
      }),
      tap(this.handleUserAuthResponse)
    );
  }

  createUser(email: string, password: string): Observable<IFirebaseAuthResponse> {
    return this.http.post<IFirebaseAuthResponse>(
      this.FIREBASE_EMAIL_SIGN_UP_URL + this.FIREBASE_WEB_API_KEY,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleSignupError),
      tap(this.handleUserAuthResponse)
    );
  }

  private handleUserAuthResponse(response: IFirebaseAuthResponse) {
    const expiryDate = new Date(new Date().getTime() + (+response.expiresIn * 1000));
    const user = new User(response.email, response.localId, response.idToken, expiryDate);
    this.user.next(user);
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
