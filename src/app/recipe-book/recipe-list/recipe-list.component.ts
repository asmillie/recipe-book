import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../data/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Chocolate Chip Cookies',
    'Simple recipe for chocolate chip cookies',
    '../../../assets/img/cookie.jpg'),
    new Recipe('Chocolate Chip Cookies',
    'Simple recipe for chocolate chip cookies',
    '../../../assets/img/cookie.jpg'),
    new Recipe('Chocolate Chip Cookies',
    'Simple recipe for chocolate chip cookies',
    '../../../assets/img/cookie.jpg'),
  ];

  constructor() { }

  ngOnInit() {
  }

}
