import { Injectable } from '@angular/core';
import { Recipe, IRecipe } from './recipe';
import { Ingredient, IIngredient } from './ingredient';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { UniqueIdGenerator } from '../utils/utils';

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
    return this.http.get<{ [recipeId: string]: IRecipe }>(
      this.FIREBASE_BASE_URL + this.RECIPE_TABLE + this.FIREBASE_URL_SUFFIX
    ).pipe(
      map((response) => {
        if (!response) {
          return [];
        }
        // Map response data to recipe array
        const recipes: Recipe[] = [];
        for (const recipeId in response) {
          if (response.hasOwnProperty(recipeId)) {
            const recipeRes: IRecipe = response[recipeId];

            const ingredients: Ingredient[] = [];
            if (recipeRes.ingredients.length > 0) {
              const ingredientResponses: IIngredient[] = recipeRes.ingredients;
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
    return this.http.post<{ recipeId: string }>(
      this.FIREBASE_BASE_URL + this.RECIPE_TABLE + this.FIREBASE_URL_SUFFIX,
      {
        name: recipe.getName(),
        description: recipe.getDescription(),
        imagePath: recipe.getImagePath(),
        ingredients: recipe.getIngredients()
      }
    ).pipe(
      catchError(this.handleError),
      map((response) => {
        console.log(response);
        recipe.setId(response.recipeId);
        return recipe;
      })
    );
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.patch<{ [recipeId: string ]: IRecipe }>(
      `${this.FIREBASE_BASE_URL}${this.RECIPE_TABLE}/${recipe.getId()}${this.FIREBASE_URL_SUFFIX}`,
      {
        name: recipe.getName(),
        description: recipe.getDescription(),
        imagePath: recipe.getImagePath(),
        ingredients: recipe.getIngredients()
      }
    ).pipe(
      catchError(this.handleError),
      map(() => {
        return recipe;
      })
    );
  }

  deleteRecipe(id: string): Observable<boolean> {
    return this.http.delete<{ response: string }>(
      `${this.FIREBASE_BASE_URL}${this.RECIPE_TABLE}/${id}${this.FIREBASE_URL_SUFFIX}`
    ).pipe(
      catchError(this.handleError),
      map((response) => {
        if (response === null) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<{ [ ingredientId: string ]: IIngredient }>(
      this.FIREBASE_BASE_URL + this.INGREDIENT_TABLE + this.FIREBASE_URL_SUFFIX
    ).pipe(
      catchError(this.handleError),
      map((response) => {
        if (!response) {
          return [];
        }

        const ingredients: Ingredient[] = [];
        for (const ingredientId in response) {
          if (response.hasOwnProperty(ingredientId)) {
            const ingredientRes: IIngredient = response[ingredientId];

            ingredients.push(
              new Ingredient(
                ingredientId,
                ingredientRes.name,
                ingredientRes.amount,
                ingredientRes.unit
              )
            );
          }
        }

        return ingredients;
      })
    );
  }

  saveIngredients(...ingredients: Ingredient[]) {
    // Transform ingredient array into JSON object containing
    // list of ingredient objects. Each ingredient has a
    // unique id string generated that adheres to the firebase structure
    let ingredientJson = '{';
    ingredients.forEach((ingredient: Ingredient, i) => {
      if (i > 0) {
        ingredientJson += ',';
      }
      // Generate unique id string for each ingredient
      ingredientJson += `"${UniqueIdGenerator.generate().toString()}": `;
      ingredientJson += JSON.stringify(ingredient, ['name', 'unit', 'amount']);
    });
    ingredientJson += '}';

    return this.http.patch<any>(
      this.FIREBASE_BASE_URL + this.INGREDIENT_TABLE + this.FIREBASE_URL_SUFFIX,
      ingredientJson
    ).pipe(
      catchError(this.handleError)
    );
  }

  // updateIngredient(ingredient: Ingredient) {
  //   return this.http.patch(
  //     `${this.FIREBASE_BASE_URL}/${this.INGREDIENT_TABLE}/${ingredient.getId()}${this.FIREBASE_URL_SUFFIX}`,
  //     {
  //       name: ingredient.getName(),
  //       amount: ingredient.getAmount(),
  //       unit: ingredient.getUnit()
  //     }
  //   ).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  deleteIngredient(ingredient: Ingredient) {
    return this.http.delete(
      `${this.FIREBASE_BASE_URL}/${this.INGREDIENT_TABLE}/${ingredient.getId()}${this.FIREBASE_URL_SUFFIX}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(`Error code ${error.status}: ${error.error}`);
    }

    return throwError('An error has occurred, please try again');
  }
}
