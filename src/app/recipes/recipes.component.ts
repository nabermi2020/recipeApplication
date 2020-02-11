import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit, OnDestroy {
  public selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    
  }

}
