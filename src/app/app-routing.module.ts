import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeListComponent } from './recipe-book/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { AddRecipeComponent } from './recipe-book/add-recipe/add-recipe.component';
import { RecipesComponent } from './recipe-book/recipes.component';
import { RecipeDetailResolverService } from './recipe-book/recipe-detail/recipe-detail-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'recipes/list', pathMatch: 'full' },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: 'add', component: AddRecipeComponent },
      { path: 'edit/:id', component: AddRecipeComponent },
      { path: '',
        component: RecipeListComponent,
        children: [
          { path: ':id', component: RecipeDetailComponent, resolve: { recipe: RecipeDetailResolverService } }
        ]
      },
    ]
  }
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
