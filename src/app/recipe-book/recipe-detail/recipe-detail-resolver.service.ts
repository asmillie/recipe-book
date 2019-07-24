import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/data/recipe';
import { Subscription, Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { RecipeService } from 'src/app/data/recipe.service';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailResolverService implements Resolve<Recipe> {

  constructor(
    private recipeService: RecipeService,
    private router: Router) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe> | Observable<never> {

    const id = route.paramMap.get('id');

    return this.recipeService.getRecipeById(+id).pipe(
      take(1),
      mergeMap(recipe => {
        if (recipe) {
          return of(recipe);
        } else {
          this.router.navigate(['/recipes']);
          return EMPTY;
        }
      })
    );
  }
}
