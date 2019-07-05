import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../data/recipe';
import { RecipeService } from 'src/app/data/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeList: Recipe[];
  selectedRecipeId: number;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeList = this.recipeService.getRecipes();
    if (this.recipeList.length !== 0) {
      this.selectRecipeById(this.recipeList[0].getId());
    }
    this.addRecipe();
    this.addRecipe();
  }

  addRecipe() {
    const recipe = new Recipe(
          this.recipeService.getNextId(),
          'Chocolate Chip Cookies',
          'Simple recipe for chocolate chip cookies',
          '../../../assets/img/cookie.jpg');

    this.recipeService.addRecipe(recipe);
  }

  selectRecipeById(id: number) {
    this.selectedRecipeId = id;
  }

}
