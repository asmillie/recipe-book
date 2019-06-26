import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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

}
