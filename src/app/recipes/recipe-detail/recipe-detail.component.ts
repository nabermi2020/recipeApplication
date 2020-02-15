import { Component, OnInit, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as fromRecipe from './../store/recipe.reducers';
import * as  RecipeActions from './../store/recipe.actions';
import * as ShoppingListActions from './../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  selectedRecipe: Observable<fromRecipe.State>;
  public id: number;
  public userIdSubscription: Subscription;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeautureState>) {}

  ngOnInit() {
    this.checkRecipeId();
  }

  public checkRecipeId(): void {
    this.userIdSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.bindRecipeData();
      }
    );
  }

  public bindRecipeData(): void {
    // this.selectedRecipe = this.recipeService.getRecipeById(this.id);
    this.selectedRecipe = this.store.select('recipes');
    // console.log(this.selectedRecipe);
  }

  public addIngredientsToShoppingList(): void {
    // this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
    this.store.select('recipes')
      .pipe(take(1))
        .subscribe(
          (recipeState: fromRecipe.State) => {
            this.store.dispatch(new ShoppingListActions.addIngredients(
              recipeState.recipes[this.id].ingredients)
            );
          }
        );
   // 
  }

  public deleteRecipe(): void {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch( new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.userIdSubscription.unsubscribe();
  }
  
}
