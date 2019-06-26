import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Ingredient } from '../../data/ingredient';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient(0, 'Apple', 5, ''),
    new Ingredient(1, 'Brown Sugar', 1, 'Bag')
  ];

  ingredientForm = this.fb.group({
    name: ['', Validators.required],
    amount: ['', Validators.required],
    unit: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  deleteId(id: number) {
    const indexToDelete = this.ingredients.findIndex((ingredient) => id === ingredient.id);

    if (indexToDelete === -1) {
      console.log('Index to delete does not exist');
    } else {
      this.ingredients.splice(indexToDelete, 1);
    }
  }

  getNextId(): number {
    return this.ingredients.length;
  }

  onSubmit() {
    console.log(this.ingredientForm.value);
    this.ingredients.push(
      new Ingredient(
        this.getNextId(),
        this.ingredientForm.get('name').value,
        this.ingredientForm.get('amount').value,
        this.ingredientForm.get('unit').value
      )
    );
    this.ingredientForm.reset();
  }

}
