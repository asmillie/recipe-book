import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Ingredient } from './ingredient';

import { AppRepositoryService } from './app-repository.service';
import { filter, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class IngredientService {

    private ingredients: BehaviorSubject<Ingredient[]>;

    constructor(private repository: AppRepositoryService) {
        this.initIngredients();
        this.refreshIngredients();
    }

    getIngredients(): Observable<Ingredient[]> {
        return this.ingredients;
    }

    getIngredientById(id: string): Observable<Ingredient> {
        return this.ingredients.pipe(
            filter((ingredientList) => ingredientList.length > 0),
            map((ingredientList) => ingredientList.find((ingredient) => ingredient.getId() === id))
        );
    }

    addIngredient(ingredient: Ingredient) {
        return this.repository.saveIngredients(ingredient);
    }

    addIngredients(ingredients: Ingredient[]): Observable<Ingredient[]> {
        return this.repository.saveIngredients(...ingredients);
    }

    updateIngredient(ingredient: Ingredient): boolean {
        return true;
    }

    deleteIngredientById(id: string): boolean {
        return true;
    }

    private initIngredients(): void {
        this.ingredients = new BehaviorSubject([]);
    }

    private refreshIngredients(): void {
        this.repository.getIngredients().subscribe((ingredients) => {
            this.ingredients.next(ingredients);
        });
    }
}
