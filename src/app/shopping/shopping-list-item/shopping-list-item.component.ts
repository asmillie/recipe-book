import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/data/ingredient';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.css']
})
export class ShoppingListItemComponent implements OnInit {

  @Input() ingredient: Ingredient;
  @Output() deleteId = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.deleteId.emit(this.ingredient.id);
  }

}
