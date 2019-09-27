import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeListItemComponent } from './recipe-list-item/recipe-list-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipesComponent } from './recipes.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
    declarations: [
        RecipeListComponent,
        RecipeListItemComponent,
        RecipeDetailComponent,
        AddRecipeComponent,
        RecipesComponent,
    ],
    exports: [
        RecipeListComponent,
        RecipeListItemComponent,
        RecipeDetailComponent,
        AddRecipeComponent,
        RecipesComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
    ]
})
export class RecipeBookModule {

}
