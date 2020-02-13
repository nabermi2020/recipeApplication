import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as fromAuth from './../store/auth.actions';
import * as fromApp from './../../store/app.reducers';
import { Store } from '@ngrx/store';
 
 

@Injectable()
export class AuthService {
    public token: string;
    public isUserAuthenticated = new Subject();

    constructor(private router: Router,
                private store: Store<fromApp.AppState>) {}

    public signUpUser(email: string, password: string): void {
         firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                user => {
                    console.log(user);
                    //this.store.dispatch( new fromAuth.signUp());
                    // firebase.auth().currentUser.getIdToken().
                    //     then(
                    //         (token: string) => {
                    //             tokens = token;
                    //             this.router.navigate(['recipes']);
                    //             //this.store.dispatch( new fromAuth.setToken(token));
                    //         }
                    //     );
                }   
            )
            .catch((error) => {
                console.log(error);
            })
         
            
    }

    public signInUser(email: string, password: string): void {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                (response) => {
                    console.log(response);
                //     firebase.auth().currentUser.getIdToken().
                //         then(
                //             (token: string) => {
                //                 this.router.navigate(['recipes']);
                //                 this.store.dispatch( new fromAuth.signIn());
                //                 this.store.dispatch( new fromAuth.setToken(token));
                //             }
                //         );
                 }
            ).
            catch(
                (error) => {
                    console.log(error);
                }
            )
    }

    public getToken(): string {
        // firebase.auth().currentUser.getIdToken().then(
        //     (token: string) => {
        //         this.token = token;
        //     }
        // );
        let token: string;
        this.store.select('auth').subscribe(
            (authStore) => {
                token = authStore.token;
            }
        )

        return token;
    }

    public logOut(): void {
        firebase.auth().signOut();
        this.store.dispatch( new fromAuth.logOut());
        this.router.navigate(['recipes']);
    }
}
