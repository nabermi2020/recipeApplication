import { AuthService } from './../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducers';
import * as AuthActions from './../store/auth.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  public onSignIn(form: NgForm): void {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch( new AuthActions.trySignIn({username: email, password: password}));
    // this.authService.signInUser(email, password);
  }

}
