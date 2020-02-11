import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Array<Recipe>;
  private recipesSubscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.bindRecipes();
  }

  public bindRecipes(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipesSubscription = this.recipeService.recipesChanges.subscribe(
      (recipes: Array<Recipe>) => {
        this.recipes = recipes;
      }
    );
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }

}
