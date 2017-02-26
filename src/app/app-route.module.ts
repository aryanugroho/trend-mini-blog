import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardComponent }   from './news/card.component';
import { NewsComponent }      from './news/news.component';
import { AddCardComponent }  from './admin/card-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  { path: 'news',  component: NewsComponent },
  { path: 'news/:id', component: CardComponent },
  { path: 'admin',     component: AddCardComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/