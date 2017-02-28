import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardComponent } from './news/card.component';
import { NewsComponent } from './news/news.component';
import { AddCardComponent } from './admin/card-add.component';

const routes: Routes = [
    { path: '', redirectTo: '/news', pathMatch: 'full' },
    { path: 'news', component: NewsComponent },
    { path: 'news/:id', component: CardComponent },
    { path: 'admin', component: AddCardComponent },
    { path: 'admin/:id', component: AddCardComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }