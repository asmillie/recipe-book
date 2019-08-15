import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from './ingredient';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RecipeResponse } from './firebase/recipe-response';
import { IngredientResponse } from './firebase/ingredient-response';

@Injectable({
  providedIn: 'root'
})
export class AppRepositoryService {

  private FIREBASE_BASE_URL = 'https://udemy-ng-recipe-book-3e7f3.firebaseio.com/';
  private FIREBASE_URL_SUFFIX = '.json';
  private RECIPE_TABLE = 'recipes';
  private INGREDIENT_TABLE = 'ingredients';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<{ [recipeId: string]: RecipeResponse }>(
      this.FIREBASE_BASE_URL + this.RECIPE_TABLE + this.FIREBASE_URL_SUFFIX
    ).pipe(
      map((response) => {
        if (!response) {
          return [];
        }
        console.log(response);
        // Map response data to recipe array
        const recipes: Recipe[] = [];
        for (const recipeId in response) {
          if (response.hasOwnProperty(recipeId)) {
            const recipeRes: RecipeResponse = response[recipeId];

            const ingredients: Ingredient[] = [];
            if (recipeRes.ingredients.length > 0) {
              const ingredientResponses: IngredientResponse[] = recipeRes.ingredients;
              ingredientResponses.forEach(({id, name, amount, unit}) => {
                ingredients.push(
                  new Ingredient(id, name, amount, unit)
                );
              });
            }

            recipes.push(
              new Recipe(
                recipeId,
                recipeRes.name,
                recipeRes.description,
                recipeRes.imagePath,
                ingredients)
            );
          }
        }

        return recipes;
      })
    );
  }

  saveRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(
      this.FIREBASE_BASE_URL + this.RECIPE_TABLE + this.FIREBASE_URL_SUFFIX,
      recipe
    ).pipe(
      catchError(this.handleError)
    );
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.patch<Recipe>(
      `${this.FIREBASE_BASE_URL}${this.RECIPE_TABLE}/${recipe.getId()}${this.FIREBASE_URL_SUFFIX}`,
      recipe
    ).pipe(
      catchError(this.handleError)
    )
  }

  saveIngredient(ingredient: Ingredient) {
    return this.http.post<Ingredient>(
      this.FIREBASE_BASE_URL + this.INGREDIENT_TABLE + this.FIREBASE_URL_SUFFIX,
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
