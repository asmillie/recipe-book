import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/data/recipe.service';
import { Recipe } from 'src/app/data/recipe';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipe: Recipe;
  recipeForm;

  constructor(
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.initRecipe();
  }

  private initRecipe() {
    this.route.params.subscribe(({id = -1}) => {
      console.log('Observing id parameter, value is ' + id);
      if (id !== -1) {
        this.recipeService.getRecipeById(+id).subscribe((recipe) => {
          if (recipe !== null) {
            this.recipe = recipe;
            this.populateForm();
          }
        });
      }
    });
  }

  private initForm() {
    this.recipeForm = this.fb.group({
      name: [
        '',
        Validators.required
      ],
      description: [
        '',
        Validators.required
      ],
      imgPath: [
        ''
      ],
      ingredients: this.fb.array([])
    });

    // Provide some ingredient fields to start with
    let rows = 5;
    for (rows; rows > 0; rows--) {
      this.newIngredientRow();
    }
  }

  private populateForm() {
    console.log('Populating form');
    this.recipeForm.get('name').setValue(this.recipe.getName());
    this.recipeForm.get('description').setValue(this.recipe.getDescription());
    this.recipeForm.get('imgPath').setValue(this.recipe.getImagePath());

    // Clear existing ingredient rows
    // this.recipeForm.ingredients = this.fb.array([]);

    // this.recipe.getIngredients().forEach((ingredient) => {
    //   this.newIngredientRow(ingredient.getName(), ingredient.getAmount(), ingredient.getUnit());
    // });
  }

  newIngredientRow(ingredientName = '', amount = 0, unit = '') {
    this.ingredients.push(
      this.fb.group({
        ingredientName,
        amount,
        unit
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
    this.router.navigateByUrl('recipes');
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

}
