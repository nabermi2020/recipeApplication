import { HomeComponent } from './core/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'recipes' , loadChildren: './recipes/recipe.module#RecipesModule'},
  { path: 'shopping-list' , loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
