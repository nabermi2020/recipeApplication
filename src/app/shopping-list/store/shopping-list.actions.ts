import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = "[SHOPPING_LIST] ADD_INGREDIENT";
export const ADD_INGREDIENTS = "[SHOPPING_LIST] ADD_INGREDIENTS";
export const UPDATE_INGREDIENT = "[SHOPPING_LIST] UPDATE_INGREDIENT";
export const DELETE_INGREDIENT = "[SHOPPING_LIST] DELETE_INGREDIENT";
export const START_EDIT = "[SHOPPING_LIST] START_EDIT";
export const STOP_EDIT = "[SHOPPING_LIST] STOP_EDIT";

export class addIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class addIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Array<Ingredient>) {}
}

export class updateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    constructor(public payload: {index: number, ingredient: Ingredient}) {}
}

export class deleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
    constructor(public payload: {index: number}) {}
}

export class startEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number) {}
}

export class stopEdit implements Action {
    readonly type = STOP_EDIT;
}

export type shoppingListActions = addIngredient | 
                                  addIngredients |
                                  updateIngredient |
                                  deleteIngredient | 
                                  startEdit | 
                                  stopEdit;
