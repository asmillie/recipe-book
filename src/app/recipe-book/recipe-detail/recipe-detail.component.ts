import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/data/recipe';
import { RecipeService } from 'src/app/data/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipeId: number;
  recipe: Recipe;
  showDropdown = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipe = this.recipeService.getRecipeById(this.recipeId);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
