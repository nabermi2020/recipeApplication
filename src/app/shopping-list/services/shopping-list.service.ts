import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './../store/shopping-list.actions';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Array<Ingredient> = [
    new Ingredient('Tomatoes', 2),
    new Ingredient('Eggs', 3),
    new Ingredient('Potatoes', 7),
    new Ingredient('Oranges', 9),
    new Ingredient('Blueberries', 4)
  ];

  public onIngredientAdded = new Subject<Array<Ingredient>>();
  public startEditing  = new Subject<number>();

  constructor(private store: Store<{shoppingList: {ingredients: Array<Ingredient>}}>) { }

  // not used anymore
  public getIngredients(): Array<Ingredient> {
    return this.ingredients.slice();
  }

  public addIngredientsToList(ingredient: Ingredient) {
    // this.ingredients.push(ingredient);
    // this.onIngredientAdded.next(this.ingredients.slice());

    this.store.dispatch(new ShoppingListActions.addIngredient(ingredient));
  }

  public addIngredientsFromRecipeToList(ingredients: Array<Ingredient>): void {
      // this.ingredients.push(...ingredients);
      // this.onIngredientAdded.next(this.ingredients.slice());
      this.store.dispatch(new ShoppingListActions.addIngredients(ingredients));
  }

  public getIngredient(index: number): Ingredient {
    return this.ingredients.slice()[index];
  }

  public updateIngredient(index: number, updatedIngredient: Ingredient): void {
    this.ingredients[index] = updatedIngredient;
    this.onIngredientAdded.next(this.ingredients.slice());
  }

  public deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.onIngredientAdded.next(this.ingredients.slice());
  }
}
