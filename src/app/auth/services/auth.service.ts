import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
    public token: string;
    public isUserAuthenticated = new Subject();

    constructor(private router: Router) {}

    public signUpUser(email: string, password: string): void {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                console.log(error);
            })
    }

    public signInUser(email: string, password: string): void {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                (response) => {
                    console.log(response);
                    firebase.auth().currentUser.getIdToken().
                        then(
                            (token: string) => {
                                this.token = token;
                                this.router.navigate(['recipes']);
                                console.log(this.token);
                            }
                        );
                }
            ).
            catch(
                (error) => {
                    console.log(error);
                }
            )
    }

    public getToken(): string {
        firebase.auth().currentUser.getIdToken().then(
            (token: string) => {
                this.token = token;
            }
        );

        return this.token;
    }

    public isAuthenticated(): boolean {
        this.isUserAuthenticated.next(this.token != null);
        return this.token != null;
    }

    public logOut(): void {
        firebase.auth().signOut();
        this.token = null;
    }
}
