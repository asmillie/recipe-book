import { Injectable } from '@angular/core';
import { Recipe, IRecipe } from './recipe';
import { Ingredient, IIngredient } from './ingredient';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { UniqueIdGenerator } from '../utils/utils';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppRepositoryService {

  private FIREBASE_BASE_URL = 'https://recipe-book-f7900.firebaseio.com/';
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
        name: recipe.name,
        description: recipe.description,
        imagePath: recipe.imagePath,
        ingredients: recipe.ingredients
      }
    ).pipe(
      catchError(this.handleError),
      map((response) => {
        recipe.id = response.recipeId;
        return recipe;
      })
    );
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.patch<{ [recipeId: string ]: IRecipe }>(
      `${this.FIREBASE_BASE_URL}${this.RECIPE_TABLE}/${recipe.id}${this.FIREBASE_URL_SUFFIX}`,
      {
        name: recipe.name,
        description: recipe.description,
        imagePath: recipe.imagePath,
        ingredients: recipe.ingredients
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

  deleteIngredient(ingredient: Ingredient) {
    return this.http.delete(
      `${this.FIREBASE_BASE_URL}/${this.INGREDIENT_TABLE}/${ingredient.id}${this.FIREBASE_URL_SUFFIX}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): Observable<User> {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpiryDate: string;
    } = JSON.parse(localStorage.getItem('user'));

    if (!userData) {
      return of(null);
    }
    const expiryDate = new Date(userData._tokenExpiryDate);
    const user = new User(userData.email, userData.id, userData._token, expiryDate);
    return of(user);
  }

  deleteUser() {
    localStorage.removeItem('user');
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
