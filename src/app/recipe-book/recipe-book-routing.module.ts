import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeDetailResolverService } from './recipe-detail/recipe-detail-resolver.service';

const routes: Routes = [
   { path: 'recipes',
      component: RecipesComponent,
      canActivate: [AuthGuard],
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
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class RecipeBookRoutingModule {}
