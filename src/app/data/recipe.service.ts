import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Recipe } from './recipe';

import { AppRepositoryService } from './app-repository.service';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    private recipes: BehaviorSubject<Recipe[]>;

    constructor(private repository: AppRepositoryService) {
        this.initRecipes();
    }

    getRecipes(): BehaviorSubject<Recipe[]> {
        return this.recipes;
    }

    getRecipeById(id: string): Observable<Recipe> {
        return this.recipes.pipe(
            filter((recipeList) => recipeList.length > 0),
            map((recipeList) => recipeList.find((recipe) => recipe.getId() === id))
        );
    }

    addRecipe(recipe: Recipe): void {
        this.repository.saveRecipe(recipe).subscribe((recipeData) => {
            this.refreshRecipes();
        });
    }

    updateRecipe(recipe: Recipe): void {
        this.repository.updateRecipe(recipe).subscribe((recipeData) => {
            this.refreshRecipes();
        });
    }

    deleteRecipeById(id: string): void {
        this.repository.deleteRecipe(id).subscribe((response) => {
            if (response) {
                this.refreshRecipes();
            }
        });
    }

    private initRecipes(): void {
        this.recipes = new BehaviorSubject([]);
        this.refreshRecipes();
    }

    private refreshRecipes(): void {
        this.repository.getRecipes().subscribe((recipes) => {
            this.recipes.next(recipes);
        });
    }
}
