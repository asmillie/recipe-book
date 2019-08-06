import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Recipe } from './recipe';

import { MOCK_RECIPES } from './mock-recipes';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private recipes: BehaviorSubject<Recipe[]>;
    private recipeList: Recipe[]; // Mock data that would typically be in a database on backend

    constructor() {
        if (this.recipeList === undefined || this.recipeList === null) {
            this.initRecipeList();
            this.recipeList = MOCK_RECIPES;
            this.initRecipes();
        }
    }

    getRecipes(): BehaviorSubject<Recipe[]> {
        return this.recipes;
    }

    getRecipeById(id: number): Observable<Recipe> {
        return this.recipes.pipe(
            filter((recipeList) => recipeList.length > 0),
            map((recipeList) => recipeList.find((recipe) => recipe.getId() === id))
        );
    }

    getNextId(): number {
        const lastIndex = this.recipeList.length - 1;
        if (lastIndex === -1) {
            return 0;
        } else {
            return this.recipeList[lastIndex].getId() + 1;
        }
    }

    addRecipe(recipe: Recipe): void {
        this.recipeList.push(recipe); // Data would be updated in DB here
        this.refreshRecipes();
    }

    updateRecipe(recipe: Recipe): boolean {
        const index = this.getRecipeIndexById(recipe.getId());
        if (index !== -1) {
            this.recipeList.splice(index, 1, recipe);
            this.refreshRecipes();
            return true;
        }
        return false;
    }

    deleteRecipeById(id: number): boolean {
        const index = this.getRecipeIndexById(id);
        if (index !== -1) {
            this.recipeList.splice(index, 1);
            this.refreshRecipes();
            return true;
        }
        return false;
    }

    private initRecipeList(): void {
        this.recipeList = [];
    }

    private initRecipes(): void {
        this.recipes = new BehaviorSubject(this.recipeList);
        this.refreshRecipes();
    }

    private refreshRecipes(): void {
        // Call to backend would be made here to sync the data
        this.recipes.next(this.recipeList);
    }

    private getRecipeIndexById(id: number): number {
        return this.recipeList.findIndex(recipe => recipe.getId() === id);
    }
}
