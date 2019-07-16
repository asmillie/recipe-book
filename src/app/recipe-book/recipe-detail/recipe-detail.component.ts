import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/data/recipe';
import { RecipeService } from 'src/app/data/recipe.service';
import { IngredientService } from 'src/app/data/ingredient.service';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeId: number;
  recipe: Recipe;
  showDropdown = false;
  addedToShopping = false;

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.initRecipe();
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

  editRecipe() {
    this.router.navigate(['recipes/edit', this.recipeId]);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipeById(this.recipeId);
  }

  private initRecipe() {
    this.route.params.subscribe((params: Params) => {
      if (params.id !== this.recipeId) {
        this.recipeId = +params.id;
        this.refreshRecipe();
      }
    });
  }

  private refreshRecipe() {
    const value = this.recipeService.getRecipeById(this.recipeId);
    if (value !== null) {
      value.subscribe((recipe) => {
        this.recipe = recipe;
      });
    }
  }
}
