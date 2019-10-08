import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'recipes',
    loadChildren: () => import('./recipe-book/recipe-book.module').then(m => m.RecipeBookModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes, {
        preloadingStrategy: PreloadAllModules
      }
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
