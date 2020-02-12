import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";


export interface AppState {
    shoppingList: State
}

export interface State {
    ingredients: Array<Ingredient>,
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initialState = {
  ingredients: [
    new Ingredient("Tomatoes", 2),
    new Ingredient("Eggs", 3),
    new Ingredient("Potatoes", 7),
    new Ingredient("Oranges", 9),
    new Ingredient("Blueberries", 4)
  ],

  editedIngredient: null,
  editedIngredientIndex: -1
};

export function ShoppingListReducer(
  state = initialState,
  action: ShoppingListActions.shoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    }

    case ShoppingListActions.ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    }

    case ShoppingListActions.UPDATE_INGREDIENT: {
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const ingredients = [...state.ingredients];
      ingredients[action.payload.index] = updatedIngredient;

      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }

    case ShoppingListActions.DELETE_INGREDIENT: {
      const ingredients = [...state.ingredients];
      ingredients.splice(action.payload.index, 1);

      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }

    case ShoppingListActions.START_EDIT: {
        const editedIngredient = {...state.ingredients[action.payload]};
        return {
            ...state,
            editedIngredientIndex: action.payload,
            editedIngredient: editedIngredient
        }
    }

    case ShoppingListActions.STOP_EDIT: {
        return {
            ...state,
            editedIngredientIndex: -1,
            editedIngredient: null
        }
    }

    default:
      return state;
  }
}
