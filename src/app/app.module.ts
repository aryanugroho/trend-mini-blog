import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { CardComponent } from './news/card.component';
import { AddCardComponent } from './admin/card-add.component';
// import 'hammerjs';

import { AppRoutingModule }     from './app-route.module';

export const firebaseConfig = {
  apiKey: "AIzaSyC0H7AtMMInc8250xs07vdHFFchY2ojLYw",
  authDomain: "trendminiblog.firebaseapp.com",
  databaseURL: "https://trendminiblog.firebaseio.com",
  storageBucket: "trendminiblog.appspot.com",
  messagingSenderId: "1079613611429"
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [
    AppComponent, NewsComponent, CardComponent, AddCardComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
