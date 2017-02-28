import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import * as showdown  from 'showdown';

@Component({
    selector: 'card',
    template: ` 
       <style>
        .rd-card {
          margin: 20px;
        }
        .rd-right {
          float: right;
          margin-left:auto; 
          margin-right:0;
          cursor: pointer;
        }
        .rd-title {
            font-size: 20px;
            text-decoration: none;
            font-color: blue;
        }
       </style>
       <md-card class="rd-card">
          <md-card-header>
            <md-card-title> 
              <a routerLink="/news/{{ card?.$key }}" routerLinkActive="active" class="rd-title">{{ card?.title }}</a>
            </md-card-title>
            <md-icon *ngIf="isAuth" class="rd-right" (click)="deleteNews()">delete</md-icon>
          </md-card-header>
          <md-card-content>
            <div [innerHTML]="sanitizedHtmlContent"></div>
          </md-card-content>
          <md-card-actions>
            <button md-button (click)="addLike()"><md-icon class="rd-icon">thumb_up</md-icon><span> {{ card?.like }} </span></button>
          </md-card-actions>
        </md-card>  
    `
})
export class CardComponent implements OnInit {

    @Input() card: any;
    cardObservable: any;

    constructor(
        private af: AngularFire,
        private route: ActivatedRoute,
        private router: Router,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        this.route.params
            .map((params: Params) => params['id'] )
            .filter(id => id !== undefined)
            .subscribe(id => {
                if (id) {
                    this.cardObservable = this.af.database
                        .object(`/news/${id}`);
                    this.cardObservable
                        .subscribe((card) => {
                            if (card) {
                                this.card = card
                            }
                        });
                }
            });
    }

    get sanitizedHtmlContent() {
        const converter = new showdown.Converter()
        return this.sanitizer.bypassSecurityTrustHtml(converter.makeHtml(this.card.content));
    }

    deleteNews() {
        if (!this.isAuth) { return; }

        this.cardModel
            .remove()
            .then(response => {
                console.log('delete card', response);
                this.router.navigate(['/news']);
            });
    }

    get isAuth() {
        return localStorage.getItem('uid') === this.card.uid;
    }

    get cardModel() {
        if (!this.cardObservable) {
            this.cardObservable = this.af.database.object('/news/' + this.card.$key);
        }
        return this.cardObservable;
    }

    addLike() {
        this.cardModel
            .update({ like: this.card.like + 1 });
    }
}