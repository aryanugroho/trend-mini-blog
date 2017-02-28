import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularFire } from 'angularfire2';

@Component({
    moduleId: module.id,
    selector: 'card-add',
    template: ` 
        <style>
            .full-width {
                width: 100%;
            }
            .button-row {
                float: right;
                justify-content: space-around;
            }
            .button-space {
                margin-right: 10px;
            }
        </style>
        <p>
        <div class="button-row">
              <a href="http://showdownjs.github.io/demo/" target="_new" class="button-space">마크다운 배우기</a>
              <button md-raised-button class="button-space" (click)="addNews(newsTitle, newsContent)">출판</button>
              <a md-raised-button routerLink="/news" class="button-space">취소</a>
        </div>
        <md-input-container class="full-width">
            <input mdInput placeholder="Title" [value]="card?.title" #newsTitle>
        </md-input-container>
        <p>
        <md-input-container class="full-width">
            <textarea mdInput placeholder="You can write content based on Markdown (http://showdownjs.github.io/demo/)" rows="30" #newsContent>{{ card?.content }}</textarea>
        </md-input-container>
    `
})
export class AddCardComponent implements OnInit {

    card: any;
    isUpdate: boolean;

    constructor(
        private af: AngularFire,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.isUpdate = false;
        this.route.params
            .map((params: Params) => params['id'])
            .filter(id => id !== undefined)
            .subscribe(id => {
                if (id) {
                    const cardObservable = this.af.database
                        .object(`/news/${id}`);
                    cardObservable
                        .subscribe((card) => {
                            if (card) {
                                this.card = card
                                this.isUpdate = true;
                            }
                        });
                }
            });
    }

    addNews(title, content) {
        const tv = title.value;
        const cv = content.value;

        if (!tv || !cv) {
            alert('input value')
            return;
        }

        const news = {
            title: tv,
            content: cv,
            like: 0,
            create: new Date().getTime(),
            uid: localStorage.getItem('uid')
        };

        if (this.isUpdate) {
            this.af.database.object(`/news/${this.card.$key}`)
                .update(news)
                .then((response) => {
                    this.router.navigate(['/news']);
                });
        } else {
            const key = this._guid();
            this.af.database.object(`/news/${key}`)
                .set(news)
                .then((response) => {
                    this.router.navigate(['/news']);
                });
        }
    }

    _guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
}