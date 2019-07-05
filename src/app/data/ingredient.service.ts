import { Injectable } from '@angular/core';

import { Ingredient } from './ingredient';

@Injectable({
    providedIn: 'root'
})
export class IngredientService {
    ingredientList: Ingredient[];

    constructor() {
        this.initIngredientList();
    }

    getIngredients(): Ingredient[] {
        return this.ingredientList;
    }

    getIngredientById(id: number): Ingredient {
        const index = this.getIndexForIngredientId(id);
        if (index !== -1) {
            return this.ingredientList[index];
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
        this.ingredientList.push(ingredient);
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
        this.ingredientList = [];
    }

    private getIndexForIngredientId(id: number): number {
        return this.ingredientList.findIndex((ing) => ing.getId() === id);
    }
}
