import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './services/shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Observable<{ingredients: Array<Ingredient>}>;
  private ingredientsSubscription = new Subscription();
  
  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{shoppingList: {ingredients: Array<Ingredient>}}>) { }

  ngOnInit() {
    this.getIngredients();
  }

  public getIngredients(): void {
    // this.ingredients = this.shoppingListService.getIngredients();
    
    // this.ingredientsSubscription = this.shoppingListService.onIngredientAdded.subscribe(
    //   (ingredientsList: Array<Ingredient>) => {
    //     this.ingredients = ingredientsList;
    //   }
    // )
    this.ingredients = this.store.select('shoppingList');
  }

  public onEditItem(ingredientIndex: number): void {
    this.shoppingListService.startEditing.next(ingredientIndex);
  }

  ngOnDestroy() {
    this.ingredientsSubscription.unsubscribe();
  }

}
