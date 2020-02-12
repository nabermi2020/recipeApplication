import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = "[SHOPPING_LIST] ADD_INGREDIENT";
export const ADD_INGREDIENTS = "[SHOPPING_LIST] ADD_INGREDIENTS";

export class addIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class addIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Array<Ingredient>) {}
  }

export type shoppingListActions = addIngredient | 
                                  addIngredients;
