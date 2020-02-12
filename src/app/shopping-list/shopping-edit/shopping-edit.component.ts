import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientName', {static: true}) ingredientName: ElementRef;
  @ViewChild('ingredientAmount', {static: true}) ingredientAmount: ElementRef;
  @ViewChild('f', {static: true}) ingredientForm: NgForm;
  private onStartEditing: Subscription;
  public editMode: boolean = false;
  public editedItemIndex: number = null;
  public editedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{shoppingList: {ingredients: Array<Ingredient>}}>) {}

  ngOnInit() {
    this.startEditing();
  }

  public startEditing(): void {
    this.onStartEditing = this.shoppingListService.startEditing.subscribe(
      (ingridIndex: number) => {
        this.editedItemIndex = ingridIndex;
        this.editMode = true;
        this.editedIngredient = this.shoppingListService.getIngredient(ingridIndex);
        this.ingredientForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
      }
    );
  }

  public onSubmit(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      //this.shoppingListService.addIngredientsToList(newIngredient);
      this.store.dispatch(new ShoppingListActions.addIngredient(newIngredient));
    }

    this.resetForm();
  }

  public resetForm(): void {
    this.editMode = false;
    this.ingredientForm.reset();
  }

  public deleteIngredient(): void {
    console.log(this.editedItemIndex);
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.resetForm();
  }

  ngOnDestroy() {
    this.onStartEditing.unsubscribe();
  }
}
