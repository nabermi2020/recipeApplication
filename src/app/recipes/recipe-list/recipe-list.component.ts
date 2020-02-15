import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRecipe from './../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  public recipesState: Observable<fromRecipe.State>;
  
  constructor(private recipeService: RecipeService,
              private store: Store<fromRecipe.FeautureState>) { }

  ngOnInit() {
    this.bindRecipes();
  }

  public bindRecipes(): void {
    // this.recipes = this.recipeService.getRecipes();
    // this.recipesSubscription = this.recipeService.recipesChanges.subscribe(
    //   (recipes: Array<Recipe>) => {
    //     this.recipes = recipes;
    //   }
    // );
    this.recipesState = this.store.select('recipes');
    

  }

}
