import { AuthService } from '../../auth/services/auth.service';
import { RecipeService } from '../../recipes/services/recipe.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isUserAuthenticated: boolean = false;

  constructor(private recipeService: RecipeService,
              private authService: AuthService) { }

  ngOnInit() {
    // this.authService.isUserAuthenticated.subscribe(
    //   (res: boolean) => {
    //     this.isUserAuthenticated = res;
    //     console.log(this.isUserAuthenticated);
    //   }
    // )
  }

   public saveRecipe(): void {
     this.recipeService.putRecipesOnServer().subscribe();
   }

   public fetchRecipes(): void {
     this.recipeService.fetchRecipeFromServer();
   }

   public logOut(): void {
     this.authService.logOut();
   }

}
