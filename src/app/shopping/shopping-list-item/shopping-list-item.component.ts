import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/data/ingredient';
import { IngredientService } from 'src/app/data/ingredient.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.css']
})
export class ShoppingListItemComponent implements OnInit, OnDestroy {

  @Input() ingredientId: string;
  ingredientSubscription: Subscription;
  ingredient: Ingredient;

  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
    this.ingredientSubscription = this.ingredientService.getIngredientById(this.ingredientId)
      .subscribe((ingredient) => {
        this.ingredient = ingredient;
      });
  }

  ngOnDestroy() {
    this.ingredientSubscription.unsubscribe();
  }

  delete() {
    this.ingredientService.deleteIngredientById(this.ingredientId);
  }

}
