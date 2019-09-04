import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService, IFirebaseAuthResponse } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  loginForm;
  authSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  // TODO: Add validation
  private initForm() {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.authSubscription = this.auth.loginUser(email, password)
      .subscribe((response: IFirebaseAuthResponse) => {
        console.log(response);
      }, (error) => {
        console.log('Component error: ', error);
      });
  }

}
