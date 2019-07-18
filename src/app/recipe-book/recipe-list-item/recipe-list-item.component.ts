import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/data/recipe';
import { RecipeService } from 'src/app/data/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css']
})
export class RecipeListItemComponent implements OnInit, OnDestroy {

  @Input() recipeId: number;
  subscriptions: Subscription;

  recipe: Recipe;
  openDropdown = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.initRecipe();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  toggleDropdown(): void {
    if (this.openDropdown === false) {
      this.showDropdown();
    } else {
      this.closeDropdown();
    }
  }

  initRecipe() {
    this.subscriptions = this.recipeService.getRecipeById(this.recipeId)
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }

  closeDropdown(): void {
    this.openDropdown = false;
  }

  showDropdown(): void {
    this.openDropdown = true;
  }

}
