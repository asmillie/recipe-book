import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/data/recipe.service';
import { Recipe } from 'src/app/data/recipe';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipeForm;

  constructor(
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imgPath: [''],
      ingredients: this.fb.array([])
    });

    // Provide some ingredient fields to start with
    let rows = 5;
    for (rows; rows > 0; rows--) {
      this.newIngredientRow();
    }
  }

  newIngredientRow() {
    this.ingredients.push(
      this.fb.group({
        ingredientName: [''],
        amount: [0],
        unit: ['']
      })
    );
  }

  removeIngredientRow(index) {
    this.ingredients.removeAt(index);
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
    this.router.navigateByUrl('recipe-book');
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

}
