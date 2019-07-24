import { Component, OnInit, OnDestroy } from '@angular/core';

import { Recipe } from '../../data/recipe';
import { RecipeService } from 'src/app/data/recipe.service';
import { Ingredient } from 'src/app/data/ingredient';
import { IngredientService } from 'src/app/data/ingredient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipeSubscription: Subscription;
  recipeList: Recipe[];
  selectedRecipeId: number;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedRecipeId = -1;
    this.recipeSubscription = this.recipeService.getRecipes()
      .subscribe((recipes) => {
        this.recipeList = recipes;
        if (this.selectedRecipeId === -1) {
          this.selectRecipeById(this.recipeList[0].getId());
        }
      });
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

  selectRecipeById(id: number) {
    this.selectedRecipeId = id;
    this.router.navigate(['/recipes', id], { relativeTo: this.route });
  }

}
