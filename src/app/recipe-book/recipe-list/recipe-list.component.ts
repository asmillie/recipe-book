import { Component, OnInit, OnDestroy } from '@angular/core';

import { Recipe } from '../../data/recipe';
import { RecipeService } from 'src/app/data/recipe.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription;
  recipeList: Recipe[];
  selectedRecipeId: string;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const recipeSub = this.recipeService.getRecipes()
      .subscribe((recipes) => {
        this.recipeList = recipes;
        this.selectFirstRecipe();
      });

    this.subscriptions = recipeSub;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  selectRecipeById(id: string) {
    this.selectedRecipeId = id;
    this.router.navigate(['/recipes', id], { relativeTo: this.route });
  }

  private selectFirstRecipe() {
    if (this.recipeList.length > 0) {
      this.selectRecipeById(this.recipeList[0].getId());
    }
  }

}
