import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Ingredient } from '../../data/ingredient';
import { IngredientService } from 'src/app/data/ingredient.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredientSubscription: Subscription;
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
    this.ingredientSubscription = this.ingredientService.getIngredients()
      .subscribe((ingredient) => {
        this.ingredients = ingredient;
      });
  }

  ngOnDestroy() {
    this.ingredientSubscription.unsubscribe();
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
