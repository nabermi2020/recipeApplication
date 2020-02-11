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
        RecipesModule
    ]
})
export class CoreModule {}