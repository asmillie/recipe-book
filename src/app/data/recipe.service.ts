import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Recipe } from './recipe';

import { MOCK_RECIPES } from './mock-recipes';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private recipeList: Recipe[];

    constructor() {
        if (this.recipeList === undefined || this.recipeList === null) {
            this.initRecipeList();
            this.recipeList = MOCK_RECIPES;
        }
    }

    getRecipes(): Recipe[] {
        return this.recipeList;
    }

    getRecipeById(id: number): Observable<Recipe> {
        const index = this.getRecipeIndexById(id);
        console.log('Index ' + index + ' found for Recipe Id ' + id);
        if (index !== -1) {
            return of(this.recipeList[id]);
        } else {
            return of(null);
        }
    }

    getNextId(): number {
        const lastIndex = this.recipeList.length - 1;
        if (lastIndex === -1) {
            return 0;
        } else {
            return this.recipeList[lastIndex].getId() + 1;
        }
    }

    addRecipe(recipe: Recipe): number {
        this.recipeList.push(recipe);
        return this.getRecipeIndexById(recipe.getId());
    }

    updateRecipe(recipe: Recipe): boolean {
        const index = this.getRecipeIndexById(recipe.getId());
        if (index !== -1) {
            this.recipeList.splice(index, 1, recipe);
            return true;
        }
        return false;
    }

    deleteRecipeById(id: number): boolean {
        const index = this.getRecipeIndexById(id);
        if (index !== -1) {
            this.recipeList.splice(index, 1);
            return true;
        }
        return false;
    }

    private initRecipeList(): void {
        this.recipeList = [];
    }

    private getRecipeIndexById(id: number): number {
        return this.recipeList.findIndex(recipe => recipe.getId() === id);
    }
}
