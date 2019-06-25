import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../data/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeList: Recipe[] = [
    new Recipe(0,
      'Chocolate Chip Cookies',
    'Simple recipe for chocolate chip cookies',
    '../../../assets/img/cookie.jpg'),
    new Recipe(1,
      'Chocolate Chip Cookies',
    'Simple recipe for chocolate chip cookies',
    '../../../assets/img/cookie.jpg'),
    new Recipe(2,
      'Chocolate Chip Cookies',
    'Simple recipe for chocolate chip cookies',
    '../../../assets/img/cookie.jpg'),
  ];

  constructor() { }

  ngOnInit() {
  }

}
