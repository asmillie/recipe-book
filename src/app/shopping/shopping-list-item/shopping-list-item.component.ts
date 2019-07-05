import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/data/ingredient';
import { IngredientService } from 'src/app/data/ingredient.service';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.css']
})
export class ShoppingListItemComponent implements OnInit {

  @Input() ingredientId: number;
  ingredient: Ingredient;

  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
    this.ingredient = this.ingredientService.getIngredientById(this.ingredientId);
  }

  delete() {
    this.ingredientService.deleteIngredientById(this.ingredientId);
  }

}
