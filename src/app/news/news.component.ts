import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import * as _ from 'underscore';

@Component({
    selector: 'news',
    template: `
        <card [card]="card" *ngFor="let card of cards"> </card>
    `
})
export class NewsComponent implements OnInit {
    cards: any[];

    constructor(
        private af: AngularFire,
        private title: Title
    ) { }

    ngOnInit() {
        this.af.database
            .list('/news')
            .subscribe((news) => {
                this.cards = news; //_.sortBy(news, o => o.create);
                this.title.setTitle('To be a Reactive Developer');
            });
    }
}