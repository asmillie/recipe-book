import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/data/recipe';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css']
})
export class RecipeListItemComponent implements OnInit {

  @Input() recipe: Recipe;
  openDropdown = false;

  constructor() { }

  ngOnInit() {
  }

  toggleDropdown(): void {
    if (this.openDropdown === false) {
      this.showDropdown();
    } else {
      this.closeDropdown();
    }
  }

  closeDropdown(): void {
    this.openDropdown = false;
  }

  showDropdown(): void {
    this.openDropdown = true;
  }

}
