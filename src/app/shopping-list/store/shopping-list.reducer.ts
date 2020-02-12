import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient("Tomatoes", 2),
    new Ingredient("Eggs", 3),
    new Ingredient("Potatoes", 7),
    new Ingredient("Oranges", 9),
    new Ingredient("Blueberries", 4)
  ]
};

export function ShoppingListReducer(
  state = initialState,
  action: ShoppingListActions.shoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

      case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    default:
      return state;
  }
}
