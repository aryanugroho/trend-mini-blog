import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import * as showdown from 'showdown';

@Component({
    selector: 'card',
    template: ` 
       <style>
        .rd-card {
          margin: 20px;
        }
        .rd-right {
          margin-left:auto; 
          margin-right:0;
          cursor: pointer;
        }
        .rd-title {
            font-size: 20px;
            text-decoration: none;
            font-color: blue;
        }
        .rd-margin {
            margin-right: 5px;
        }
        .rd-content {
            color: #636262;
        }
        a {
          text-decoration: none;
          color: #6565e2;
        }
        a:link{
           color: #6565e2;
        }
        a:hover{
           color: #6565e2;
        }
        a:active{
           color: #6565e2;
        }
       </style>
       <md-card class="rd-card">
          <md-card-header>
            <md-card-title> 
              <a routerLink="/news/{{ card?.$key }}" routerLinkActive="active" class="rd-title">
                  <i class="fa fa-slack" aria-hidden="true"></i>
                  {{ card?.title }}
              </a>
            </md-card-title>
            <div class="rd-right">
                <md-icon *ngIf="isAuth" (click)="editNews()" class="rd-margin">edit</md-icon>
                <md-icon *ngIf="isAuth" (click)="deleteNews()">delete</md-icon>
            </div>
          </md-card-header>
          <md-card-content>
            <div [innerHTML]="sanitizedHtmlContent" class="rd-content"></div>
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
        private sanitizer: DomSanitizer,
        private title: Title
    ) { }

    ngOnInit() {
        this.route.params
            .map((params: Params) => params['id'])
            .filter(id => id !== undefined)
            .subscribe(id => {
                if (id) {
                    this.cardObservable = this.af.database
                        .object(`/news/${id}`);
                    this.cardObservable
                        .subscribe((card) => {
                            if (card) {
                                this.card = card;
                                this.title.setTitle(this.card.title);
                            }
                        });
                }
            });
    }

    get sanitizedHtmlContent() {
        if (this.card) {
            const converter = new showdown.Converter();
            return this.sanitizer.bypassSecurityTrustHtml(converter.makeHtml(this.card.content));
        } else {
            return '';
        }
    }

    editNews() {
        if (!this.isAuth) { return; }

        this.router.navigate(['/admin', this.card.$key]);
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
        if (this.card) {
            return localStorage.getItem('uid') === this.card.uid;
        } else {
            return false;
        }
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