import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { switchMap, mergeMap, combineLatest } from "rxjs/operators";
import * as RecipeActions from "./recipe.actions";
import { DataStoreService } from "src/app/shared/data-store.service";
import { RecipeService } from "../services/recipe.service";
import { Store } from "@ngrx/store";
import * as fromRecipe from "./../store/recipe.reducers";

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private recipeService: RecipeService,
    private dataStore: DataStoreService,
    private store: Store<fromRecipe.FeautureState>
  ) {}

  @Effect()
  recipeFetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[RECIPES] FETCH_RECIPES"),
      switchMap(() => {
        return this.recipeService.fetchRecipeFromServer();
      }),
      mergeMap(recipes => {
        return [
          {
            type: RecipeActions.SET_RECIPES,
            payload: recipes
          }
        ];
      })
    )
  );

  @Effect({ dispatch: false })
  saveRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType("[RECIPES] PUT_RECIPES"),
      combineLatest(this.store.select("recipes")),
      switchMap(([action, state]) => {
        console.log(action);
        return this.dataStore.putRecipesOnServer(state.recipes);
      }),
      mergeMap(() => {
        return [];
      })
    )
  );
}
