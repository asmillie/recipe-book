import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../data/recipe';
import { RecipeService } from 'src/app/data/recipe.service';
import { Ingredient } from 'src/app/data/ingredient';
import { IngredientService } from 'src/app/data/ingredient.service';

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
    private ingredientService: IngredientService) { }

  ngOnInit() {
    this.recipeList = this.recipeService.getRecipes();
    if (this.recipeList.length !== 0) {
      this.selectRecipeById(this.recipeList[0].getId());
    } else {
      this.addRecipe();
      this.addRecipe();
    }
  }

  // Test data
  addRecipe() {
    const ingredients = [
      new Ingredient(-1, 'butter, softened', 1, 'cup'),
      new Ingredient(-1, 'white sugar', 1, 'cup'),
      new Ingredient(-1, 'packed brown sugar', 1, 'cup'),
      new Ingredient(-1, 'eggs', 2, ''),
      new Ingredient(-1, 'vanilla extract', 2, 'tsp'),
      new Ingredient(-1, 'baking soda', 1, 'tsp'),
      new Ingredient(-1, 'hot water', 2, 'tsp'),
      new Ingredient(-1, 'salt', 0.5, 'tsp'),
      new Ingredient(-1, 'all-purpose flour', 3, 'cups'),
      new Ingredient(-1, 'semisweet chocolate chips', 2, 'cups'),
      new Ingredient(-1, 'chopped walnuts', 1, 'cup')
    ];

    const recipe = new Recipe(
      this.recipeService.getNextId(),
      'Chocolate Chip Cookies',
      'Preheat oven to 350 degrees F (175 degrees C). \
      Cream together the butter, white sugar, and brown sugar until smooth. Beat in the eggs one at a time, then stir in the vanilla. \
      Dissolve baking soda in hot water. Add to batter along with salt. Stir in flour, chocolate chips, and nuts. \
      Drop by large spoonfuls onto ungreased pans. Bake for about 10 minutes in the preheated oven, or until edges are nicely browned.',
      '../../../assets/img/cookie.jpg',
      ingredients);

    this.recipeService.addRecipe(recipe);
  }

  selectRecipeById(id: number) {
    this.selectedRecipeId = id;
  }

}
