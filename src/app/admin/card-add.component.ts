import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
              <button md-raised-button class="button-space" (click)="addNews(newsTitle, newsContent)">출판</button>
              <a md-raised-button routerLink="/news" class="button-space">취소</a>
        </div>
        <md-input-container class="full-width">
            <input mdInput placeholder="Title" value="" #newsTitle>
        </md-input-container>
        <p>
        <md-input-container class="full-width">
            <textarea mdInput placeholder="Content" rows="20" #newsContent></textarea>
        </md-input-container>
    `
})
export class AddCardComponent implements OnInit {

    constructor(
        private af: AngularFire,
        private router: Router
    ) { }

    ngOnInit() { }

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
            create: new Date().getTime()
        };

        const key = this._guid();
            this.af.database
                .object(`/news/${key}`)
                .set(news)
                .then((response) => {
                    this.router.navigate(['/news']);
                });
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