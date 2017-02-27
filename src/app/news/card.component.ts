import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
    selector: 'card',
    template: ` 
       <style>
        .rd-card {
          margin: 10px;
        }
        .rd-right {
          float: right;
          margin-left:auto; 
          margin-right:0;
          cursor: pointer;
        }
       </style>
       <md-card class="rd-card">
          <md-card-header>
            <md-card-title> 
              <a routerLink="/news/{{ card?.$key }}" routerLinkActive="active">{{ card?.title }}</a>
            </md-card-title>
            <md-icon class="rd-right" (click)="deleteNews()">delete</md-icon>
          </md-card-header>
          <md-card-content>
            {{ card?.content }}
          </md-card-content>
          <md-card-actions>
            <button md-button><md-icon class="rd-icon">thumb_up</md-icon><span> {{ card?.like }} </span></button>
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
        private router: Router
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

    deleteNews() {
        if (!this.cardObservable) {
            this.cardObservable = this.af.database.object('/news/' + this.card.$key);
        }
        this.cardObservable
            .remove()
            .then(response => {
                console.log('delete card', response);
                this.router.navigate(['/news']);
            });
    }
}