import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import * as fromApp from './../../store/app.reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuardService implements CanActivate {
    
    constructor(private authService: AuthService,
                private store: Store<fromApp.AppState>) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean {
        let token = null;
        this.store.select('auth').subscribe(
            (authState) => {
                token = authState.token;
            }
        )
        
        return token != null;
    }
}