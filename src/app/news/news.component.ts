import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

// import * as showdown from 'showdown';

@Component({
    selector: 'news',
    template: `
        <card [card]="card" *ngFor="let card of cards"> </card>
    `
})
export class NewsComponent implements OnInit {
    cards: any[];

    constructor(private af: AngularFire) {}

    ngOnInit() { 
      this.af.database
        .list('/news')
        .subscribe((news) => {
            this.cards = news;
        });
    }
}