import { RecipesModule } from './../recipes/recipe.module';
import { AuthGuardService } from './../auth/services/auth-guard.service';
import { AuthService } from './../auth/services/auth.service';
import { DataStoreService } from './../shared/data-store.service';
import { ShoppingListService } from './../shopping-list/services/shopping-list.service';
import { RecipeService } from './../recipes/services/recipe.service';
import { AppRoutingModule } from './../app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptors } from '../shared/logging.iterceptors';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        HeaderComponent,
        AppRoutingModule
    ],
    providers: [
        RecipeService,
        ShoppingListService,
        DataStoreService,
        AuthService,
        AuthGuardService,
        RecipesModule,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptors, multi: true }
    ]
})
export class CoreModule {}