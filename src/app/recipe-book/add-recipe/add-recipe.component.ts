import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from 'src/app/data/recipe.service';
import { Recipe } from 'src/app/data/recipe';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Ingredient } from 'src/app/data/ingredient';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit, OnDestroy {

  mode: string;
  recipe: Recipe;
  subscription: Subscription;
  recipeForm;

  constructor(
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.mode = this.route.snapshot.url[0].toString();
    this.initForm();
    this.initRecipe();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private initRecipe() {
    this.route.params.subscribe(({id = -1}) => {
      if (id !== -1) {
        this.subscription = this.recipeService.getRecipeById(+id).subscribe((recipe) => {
          if (recipe !== null) {
            this.recipe = recipe;
            this.populateForm();
          } else {
            // Recipe Id not found, switch to add mode
            this.router.navigate(['recipes/add']);
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
        [
          Validators.required,
          Validators.minLength(8)]
      ],
      imgPath: [
        '',
        [
          Validators.required,
          Validators.pattern('^(http|https|\.\.){1}.+\.(jpg|jpeg|png){1}$')]
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
    this.recipeForm.get('name').setValue(this.recipe.getName());
    this.recipeForm.get('description').setValue(this.recipe.getDescription());
    this.recipeForm.get('imgPath').setValue(this.recipe.getImagePath());

    let ingredientIndex = 0;
    this.recipe.getIngredients().forEach((ingredient) => {
      const row = this.recipeForm.get('ingredients').at(ingredientIndex);
      if (row) {
        row.setValue({
          ingredientName: ingredient.getName(),
          amount: ingredient.getAmount(),
          unit: ingredient.getUnit()
        });
      } else {
        this.newIngredientRow(ingredient.getName(), ingredient.getAmount(), ingredient.getUnit());
      }
      ingredientIndex++;
    });
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
    const recipeId = this.mode === 'add' ? this.recipeService.getNextId() : this.recipe.getId();

    const ingredients: Ingredient[] = [];
    const rows = this.recipeForm.get('ingredients').length;
    for (let x = 0; x < rows; x++) {
      const row = this.recipeForm.get('ingredients').at(x);
      const name = row.get('ingredientName').value;
      const amt = row.get('amount').value;
      const unit = row.get('unit').value;

      if (name.length > 0 && amt.length > 0 && unit.length > 0) {
        ingredients.push(new Ingredient(
          -1,
          row.get('ingredientName').value,
          row.get('amount').value,
          row.get('unit').value
        ));
      }
    }

    const recipe = new Recipe(
      recipeId,
      this.recipeForm.get('name').value,
      this.recipeForm.get('description').value,
      this.recipeForm.get('imgPath').value,
      ingredients
    );

    this.mode === 'add' ? this.recipeService.addRecipe(recipe) : this.recipeService.updateRecipe(recipe);

    this.clearForm();
    this.router.navigateByUrl('recipes');
  }

  clearForm() {
    this.recipeForm.reset();
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get name() {
    return this.recipeForm.get('name');
  }

  get description() {
    return this.recipeForm.get('description');
  }

  get imgPath() {
    return this.recipeForm.get('imgPath');
  }

}
