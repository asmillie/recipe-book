import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard] },
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class ShoppingRoutingModule {}
