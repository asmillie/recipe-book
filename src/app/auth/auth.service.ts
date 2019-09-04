import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
      })
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
      catchError(this.handleError)
    );
  }

  private handleLoginError(
    error: HttpErrorResponse,
    email: string,
    password: string): Observable<never> | Observable<IFirebaseAuthResponse> {
    const errorMessage = error.error.error.message;
    // TODO: Remove logging
    console.error(error);
    // If user is attempting login but doesn't have account then
    // create user with provided email and password
    if (errorMessage === 'EMAIL_NOT_FOUND') {
      return this.createUser(email, password);
    }
    return throwError(`${error.error.error.message}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // TODO: Remove logging
    console.error(error);
    return throwError(`${error.error.error.message}`);
  }
}
