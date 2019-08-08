import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from './ingredient';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppRepositoryService {

  private FIREBASE_BASE_URL = 'https://udemy-ng-recipe-book-3e7f3.firebaseio.com/';
  private RECIPE_TABLE = 'recipes.json';
  private INGREDIENT_TABLE = 'ingredients.json';

  constructor(private http: HttpClient) { }

  getRecipes() {
    this.http.get(
      this.FIREBASE_BASE_URL + this.RECIPE_TABLE
    ).subscribe((response = '') => {
      console.log(response);
    });
  }

  saveRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(
      this.FIREBASE_BASE_URL + this.RECIPE_TABLE,
      recipe
    ).pipe(
      catchError(this.handleError)
    );
  }

  saveIngredient(ingredient: Ingredient) {
    return this.http.post<Ingredient>(
      this.FIREBASE_BASE_URL + this.INGREDIENT_TABLE,
      ingredient
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(`Error code ${error.status}: ${error.error}`);
    }

    return throwError('An error has occurred, please try again');
  }
}
