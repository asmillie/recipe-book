import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/data/recipe.service';
import { Recipe } from 'src/app/data/recipe';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipeForm;

  constructor(
    private recipeService: RecipeService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.recipeForm = this.fb.group({
      name: [''],
      description: [''],
      imgPath: ['']
    });
  }

  onSubmit() {
    const recipe = new Recipe(
      this.recipeService.getNextId(),
      this.recipeForm.get('name').value,
      this.recipeForm.get('description').value,
      this.recipeForm.get('imgPath').value
    );
    this.recipeService.addRecipe(recipe);
    this.recipeForm.reset();
  }

}
