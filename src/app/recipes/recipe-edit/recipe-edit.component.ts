import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  public id: number;
  public editMode: boolean = false;
  public routeParamsSubscription: Subscription;
  public editForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.fetchRouteParams();
  }

  public initEditForm(): void {
    const recipe = this.recipeService.getRecipeById(this.id);
    let recipeName: string;
    let recipeImagePath: string;
    let recipeDescription: string;
    let recipeIngredients = new FormArray([]);

    console.log(recipe);

    if (this.editMode) {
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients.length > 0) {
        recipe.ingredients.forEach( (ingredient: Ingredient) => {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        });
      }
    }

    this.editForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "imageUrl": new FormControl(recipeImagePath, Validators.required),
      "description": new FormControl(recipeDescription, Validators.required),
      "ingredients": recipeIngredients
    });
  }

  public fetchRouteParams(): void {
    this.routeParamsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        console.log(params.id);
        this.initEditForm();
      }
    );
  }

  public onSubmit(): void {
    const newRecipe = new Recipe(
      this.editForm.value["name"],
      this.editForm.value["description"],
      this.editForm.value["imageUrl"],
      this.editForm.value["ingredients"]
    );
    
    if (this.editMode && this.editForm.valid) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else if (!this.editMode && this.editForm.valid) {
      this.recipeService.addRecipe(newRecipe);
    }

  }

  public addIngredient(): void {
    (<FormArray>this.editForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required, 
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  public onCancel(): void {
    this.router.navigate(['/']);
  }

  public deleteCurrentRecipe(): void {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/']);
  }

  public onDeleteIngredient(index: number): void {
    (<FormArray>this.editForm.get('ingredients')).removeAt(index);
  }


  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }

}
