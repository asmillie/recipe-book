import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Ingredient, IIngredient } from './ingredient';

import { AppRepositoryService } from './app-repository.service';
import { filter, map, tap } from 'rxjs/operators';

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
            map((ingredientList) => ingredientList.find((ingredient) => ingredient.id === id))
        );
    }

    addIngredient(ingredient: Ingredient) {
        return this.repository.saveIngredients(ingredient).pipe(
            tap(() => {
                this.refreshIngredients();
            })
        );
    }

    addIngredients(ingredients: Ingredient[]): Observable<string> {
        return this.repository.saveIngredients(...ingredients).pipe(
            tap(() => {
                this.refreshIngredients();
            })
        );
    }

    // updateIngredient(ingredient: Ingredient): boolean {
    //     return true;
    // }

    deleteIngredient(ingredient: Ingredient) {
        return this.repository.deleteIngredient(ingredient).pipe(
            tap(() => {
                this.refreshIngredients();
            })
        );
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
