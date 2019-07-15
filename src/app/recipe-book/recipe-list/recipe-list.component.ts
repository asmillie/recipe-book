import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../data/recipe';
import { RecipeService } from 'src/app/data/recipe.service';
import { Ingredient } from 'src/app/data/ingredient';
import { IngredientService } from 'src/app/data/ingredient.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeList: Recipe[];
  selectedRecipeId: number;

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeList = this.recipeService.getRecipes();
    if (this.recipeList.length !== 0) {
      this.selectRecipeById(this.recipeList[0].getId());
    }
  }

  selectRecipeById(id: number) {
    this.selectedRecipeId = id;
    this.router.navigate(['/recipes', id], { relativeTo: this.route });
  }

}
