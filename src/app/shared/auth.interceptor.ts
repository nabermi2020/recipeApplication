import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducers';
import { switchMap, take } from 'rxjs/operators';
import * as fromAuth from './../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService,
                private store: Store<fromApp.AppState>) {}

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('intercepted', req);
        return this.store.select('auth')
          .pipe(
            take(1),
            switchMap((authState: fromAuth.State) => {
                const copiedRed = req.clone({params: req.params.set('auth', authState.token)});
                return next.handle(copiedRed);
            })
          )
    }
}