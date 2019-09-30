import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ShoppingListItemComponent } from './shopping-list-item/shopping-list-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingRoutingModule } from './shopping-routing.module';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListItemComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        ShoppingRoutingModule
    ]
})
export class ShoppingModule {}
