import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

// export const ADD_INGREDIENTS = '[RECIPES] ADD_INGREDIENTS';
export const ADD_RECIPE = '[RECIPES] ADD_RECIPE';
export const SET_RECIPES = '[RECIPES] SET_RECIPES'; 
export const DELETE_RECIPE = '[RECIPES] DELETE_RECIPES';
export const UPDATE_RECIPE = '[RECIPES] UPDATE_RECIPE';

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload: Array<Recipe>) {}
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload: {index: number, recipe: Recipe}) {}
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    constructor(public payload: number) {}
}

// export class AddIngredients implements Action {
//     readonly type = DELETE_RECIPE;
//     constructor(public payload: number) {}
// }

export type RecipeActions = SetRecipes | 
                            AddRecipe |
                            UpdateRecipe |
                            DeleteRecipe;