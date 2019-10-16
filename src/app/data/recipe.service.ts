import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

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
            map((recipeList) => recipeList.find((recipe) => recipe.id === id))
        );
    }

    addRecipe(recipe: Recipe): Observable<Recipe> {
        return this.repository.saveRecipe(recipe).pipe(
            tap(() => {
                this.refreshRecipes();
            })
        );
    }

    updateRecipe(recipe: Recipe): Observable<Recipe> {
        return this.repository.updateRecipe(recipe).pipe(
            tap(() => {
                this.refreshRecipes();
            })
        );
    }

    deleteRecipeById(id: string): Observable<boolean> {
        return this.repository.deleteRecipe(id).pipe(
            tap((success) => {
                if (success) {
                    this.refreshRecipes();
                }
            })
        );
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
