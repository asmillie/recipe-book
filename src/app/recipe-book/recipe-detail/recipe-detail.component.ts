import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/data/recipe';
import { RecipeService } from 'src/app/data/recipe.service';
import { IngredientService } from 'src/app/data/ingredient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  subscription: Subscription;
  showDropdown = false;
  addedToShopping = false;
  error = false;

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.initRecipe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  addToShopping() {
    const ingredients = this.recipe.ingredients;
    if (ingredients.length > 0) {
      const addIngredientsSub = this.ingredientService.addIngredients(ingredients).subscribe((response) => {
        console.log(response);
      });
      this.subscription.add(addIngredientsSub);
      this.addedToShopping = true;
    }
  }

  editRecipe() {
    this.router.navigate(['recipes/edit', this.recipe.id]);
  }

  deleteRecipe() {
    this.error = false;
    const deleteSub = this.recipeService.deleteRecipeById(this.recipe.id).subscribe((success) => {
      if (success) {
        this.router.navigate(['/recipes']);
      } else {
        this.error = true;
      }
    });

    this.subscription.add(deleteSub);
  }
  // FIXME: Adding ingredients to an existing recipe doesn't show up (recipe not refreshing)
  private initRecipe() {
    this.subscription = this.route.data.subscribe((data: { recipe: Recipe }) => {
      this.recipe = data.recipe;
    });
  }
}
