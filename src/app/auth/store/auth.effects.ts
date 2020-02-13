import { Effect, createEffect, Actions, ofType } from "@ngrx/effects";
import { switchMap, mergeMap, map } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import * as AuthActions from "./../store/auth.actions";
import * as firebase from "firebase";
import { Injectable } from "@angular/core";
import { from } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  authSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[AUTH] TRY_SIGN_UP"),
      map((action: AuthActions.trySignUp) => {
        return action.payload;
      }),
      switchMap((authData: { username: string; password: string }) => {
        return from(
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              authData.username,
              authData.password
            )
        );
      }),
      switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      }),
      mergeMap(token => {
        this.router.navigate(["recipes"]);
        return [
          {
            type: AuthActions.SIGN_UP
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      })
    )
  );

  authSignIn$ = createEffect(() => 
    this.actions$.pipe(
        ofType("[AUTH] TRY_SIGN_IN"),
        map((action: AuthActions.trySignIn) => {
            return action.payload;
        }),
        switchMap((authData: {username: string, password: string}) => {
            return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
        }),
        switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => {
            this.router.navigate(["recipes"]);
            return [
                {
                    type: AuthActions.SIGN_IN
                  },
                  {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                  }
            ];
        })
    )
  );
}
