import { Component, OnInit, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  @Input() selectedRecipe: Recipe;
  public id: number;
  public userIdSubscription: Subscription;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {}

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
    this.selectedRecipe = this.recipeService.getRecipeById(this.id);
  }

  public addIngredientsToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
  }

  public deleteRecipe(): void {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.userIdSubscription.unsubscribe();
  }
  
}
