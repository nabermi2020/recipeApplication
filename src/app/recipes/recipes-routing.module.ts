import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { RouterModule } from '@angular/router';

const recipeRoutes = [
    { path: '', component: RecipesComponent, children: [
        { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService]},
        { path: ':id', component: RecipeDetailComponent },
        { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService] }
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RecipeRoutingModule {}