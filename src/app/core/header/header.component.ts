import { AuthService } from '../../auth/services/auth.service';
import { RecipeService } from '../../recipes/services/recipe.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducers';
import { Observable } from 'rxjs';
import * as authState from './../../auth/store/auth.reducers';
import * as RecipeActions from './../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isUserAuthenticated: boolean = false;
  public isAuthenticated: Observable<authState.State>;

  constructor(private recipeService: RecipeService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.authService.isUserAuthenticated.subscribe(
    //   (res: boolean) => {
    //     this.isUserAuthenticated = res;
    //     console.log(this.isUserAuthenticated);
    //   }
    // )
    this.isAuthenticated = this.store.select('auth');
  }

   public saveRecipe(): void {
    this.store.dispatch( new RecipeActions.putRecipes()); 
    //this.recipeService.putRecipesOnServer().subscribe();
   }

   public fetchRecipes(): void {
     // this.recipeService.fetchRecipeFromServer();
     this.store.dispatch( new RecipeActions.fetchRecipes());
   }

   public logOut(): void {
     this.authService.logOut();
   }

}
