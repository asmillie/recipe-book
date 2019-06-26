import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipe-book/recipe-list/recipe-list.component';
import { RecipeListItemComponent } from './recipe-book/recipe-list-item/recipe-list-item.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ShoppingListItemComponent } from './shopping/shopping-list-item/shopping-list-item.component';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'recipe-book', component: RecipeListComponent },
  { path: 'recipe-detail/:id', component: RecipeDetailComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeListItemComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShoppingListItemComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
