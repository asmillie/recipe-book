import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeListComponent } from './recipe-book/recipe-list/recipe-list.component';
import { RecipeListItemComponent } from './recipe-book/recipe-list-item/recipe-list-item.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ShoppingListItemComponent } from './shopping/shopping-list-item/shopping-list-item.component';
import { AddRecipeComponent } from './recipe-book/add-recipe/add-recipe.component';
import { RecipesComponent } from './recipe-book/recipes.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'recipes/list', pathMatch: 'full' },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeListComponent },
      { path: 'add', component: AddRecipeComponent }
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
