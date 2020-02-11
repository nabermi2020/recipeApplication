import { DataStoreService } from './../../shared/data-store.service';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Array<Recipe> = [
    new Recipe('Burger', 'The biggest burger in the world!', 'https://rtvi.com/upload/iblock/58e/58e23f14e52fe081141c45cb39a56fd4.jpg', [{name: 'Potatoes', amount: 4},{name: 'Cheese', amount: 40}, {name: 'Bacon', amount: 2}]),
    new Recipe('Pizza', 'The most delicious pizza in the world!', 'data:image/jpeg;base64,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', [{name: 'Potatoes', amount: 4},{name: 'Cheese', amount: 40}, {name: 'Bacon', amount: 2}]),
    new Recipe('Cesar', 'Tasty Cesar!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv7WWuXjx0DUJCqnFOWZeYDgVBKYePI_VFwOoJ9ijUUdhnXVDi&s', [{name: 'Potatoes', amount: 4},{name: 'Cheese', amount: 40}, {name: 'Bacon', amount: 2}]),
    new Recipe('Sushi', 'The best rolls only here!', 'data:image/jpeg;base64,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', [{name: 'Potatoes', amount: 4},{name: 'Cheese', amount: 40}, {name: 'Bacon', amount: 2}])
  ];


  public recipesChanges = new Subject<Array<Recipe>>();

  constructor(private shoppingListService: ShoppingListService,
              private dataStoreService: DataStoreService) {
              }

  public getRecipes(): Array<Recipe> {
    return this.recipes.slice();
  }

  public addIngredientsToShoppingList(ingrediens: Array<Ingredient>): void {
    this.shoppingListService.addIngredientsFromRecipeToList(ingrediens);
  }

  public getRecipeById(id: number): Recipe{
    return this.recipes.slice()[id];
  }

  public addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanges.next(this.recipes.slice());
  }

  public updateRecipe(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe;
    this.recipesChanges.next(this.recipes.slice());
  }

  public deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanges.next(this.recipes.slice());
  }

  public putRecipesOnServer(): Observable<any> {
    return this.dataStoreService.putRecipesOnServer(this.recipes);
  }

  public fetchRecipeFromServer(): void {
    this.dataStoreService.getRecipesFromServer().subscribe(
      (recipes: Array<Recipe>) => {
        this.recipes = this.checkIngredients(recipes);
        this.recipesChanges.next(this.recipes.slice());
      }
    );
  }

  public checkIngredients(recipes: Array<Recipe>): Array<Recipe> {
    recipes.forEach((recipe: Recipe) => {
      if (!recipe["ingredients"]) {
        recipe["ingredients"] = [];
      }
    });
    return recipes;
  }
}
