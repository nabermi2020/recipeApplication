import { AuthService } from './../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as fromApp from './../../store/app.reducers';
import { Store } from '@ngrx/store';
import * as fromAuth from './../store/auth.actions';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  public onSignUp(form: NgForm): void {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new fromAuth.trySignUp({username: email, password: password}));

    //this.authService.signUpUser(email, password);
  }

}
