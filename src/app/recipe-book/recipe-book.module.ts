import { NgModule } from '@angular/core';

import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeListItemComponent } from './recipe-list-item/recipe-list-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipesComponent } from './recipes.component';

@NgModule({
    declarations: [
        RecipeListComponent,
        RecipeListItemComponent,
        RecipeDetailComponent,
        AddRecipeComponent,
        RecipesComponent,
    ]
})
export class RecipeBookModule {

}
