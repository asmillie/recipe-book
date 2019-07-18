import { Injectable } from '@angular/core';
import { Observable, of, merge } from 'rxjs';

import { Ingredient } from './ingredient';

import { MOCK_INGREDIENTS } from './mock-ingredients';

@Injectable({
    providedIn: 'root'
})
export class IngredientService {
    ingredientList: Ingredient[];

    constructor() {
        this.initIngredientList();
    }

    getIngredients(): Observable<Ingredient[]> {
        return of(this.ingredientList);
    }

    getIngredientById(id: number): Observable<Ingredient> {
        const index = this.getIndexForIngredientId(id);
        if (index !== -1) {
            return of(this.ingredientList[index]);
        } else {
            return of(null);
        }
    }

    getNextId(): number {
        const lastIndex = this.ingredientList.length - 1;
        if (lastIndex === -1) {
            return 0;
        } else {
            return this.ingredientList[lastIndex].getId() + 1;
        }
    }

    addIngredient(ingredient: Ingredient) {
        // Ingredients being added from a recipe need an id assigned
        if (ingredient.getId() === -1) {
            ingredient.setId(this.getNextId());
        }
        this.ingredientList.push(ingredient);
    }

    addIngredients(ingredients: Ingredient[]) {
        ingredients.forEach((ingredient) => {
            this.addIngredient(ingredient);
        });
    }

    updateIngredient(ingredient: Ingredient): boolean {
        const index = this.getIndexForIngredientId(ingredient.getId());
        if (index === -1) {
            return false;
        }
        this.ingredientList.splice(index, 1, ingredient);
        return true;
    }

    deleteIngredientById(id: number): boolean {
        const index = this.getIndexForIngredientId(id);
        if (index === -1) {
            return false;
        }
        this.ingredientList.splice(index, 1);
        return true;
    }

    private initIngredientList() {
        this.ingredientList = MOCK_INGREDIENTS;
    }

    private getIndexForIngredientId(id: number): number {
        return this.ingredientList.findIndex((ing) => ing.getId() === id);
    }
}
