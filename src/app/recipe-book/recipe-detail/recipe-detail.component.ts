import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/data/recipe';
import { RecipeService } from 'src/app/data/recipe.service';
import { IngredientService } from 'src/app/data/ingredient.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipeId: number;
  recipe: Recipe;
  showDropdown = false;
  addedToShopping = false;

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService) { }

  ngOnInit() {
    this.recipe = this.recipeService.getRecipeById(this.recipeId);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  addToShopping() {
    const ingredients = this.recipe.getIngredients();
    if (ingredients.length > 0) {
      this.ingredientService.addIngredients(ingredients);
      this.addedToShopping = true;
    }
  }
}
