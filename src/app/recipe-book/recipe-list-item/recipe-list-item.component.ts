import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/data/recipe';
import { RecipeService } from 'src/app/data/recipe.service';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css']
})
export class RecipeListItemComponent implements OnInit {

  @Input() recipeId: number;

  recipe: Recipe;
  openDropdown = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.initRecipe();
  }

  toggleDropdown(): void {
    if (this.openDropdown === false) {
      this.showDropdown();
    } else {
      this.closeDropdown();
    }
  }

  initRecipe() {
    this.recipeService.getRecipeById(this.recipeId).subscribe((recipe) => {
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
