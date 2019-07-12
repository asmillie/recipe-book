import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RecipeListComponent } from './recipe-book/recipe-list/recipe-list.component';
import { RecipeListItemComponent } from './recipe-book/recipe-list-item/recipe-list-item.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ShoppingListItemComponent } from './shopping/shopping-list-item/shopping-list-item.component';
import { HeaderComponent } from './header/header.component';
import { AddRecipeComponent } from './recipe-book/add-recipe/add-recipe.component';

const appRoutes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'recipe-book', component: RecipeListComponent },
  { path: 'add-recipe', component: AddRecipeComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
