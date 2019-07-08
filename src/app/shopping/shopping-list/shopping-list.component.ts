import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Ingredient } from '../../data/ingredient';
import { IngredientService } from 'src/app/data/ingredient.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];

  ingredientForm = this.fb.group({
    name: ['', Validators.required],
    amount: ['', Validators.required],
    unit: ['', Validators.required]
  });

  constructor(
    private ingredientService: IngredientService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.ingredients = this.ingredientService.getIngredients();
    if (this.ingredients === undefined || this.ingredients.length === 0) {
      this.ingredientService.addIngredient(
        new Ingredient(0, 'Apple', 5, '')
      );
      this.ingredientService.addIngredient(
        new Ingredient(1, 'Brown Sugar', 1, 'Bag')
      );
    }
  }

  deleteId(id: number) {
    const deleted = this.ingredientService.deleteIngredientById(id);
    if (!deleted) {
      console.log('error deleting ingredient');
    }
  }

  onSubmit() {
    const ingredient = new Ingredient(
      this.ingredientService.getNextId(),
      this.ingredientForm.get('name').value,
      this.ingredientForm.get('amount').value,
      this.ingredientForm.get('unit').value
    );
    this.ingredientService.addIngredient(ingredient);

    this.ingredientForm.reset();
  }

}
