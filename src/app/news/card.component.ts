import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
    selector: 'card',
    template: ` 
       <style>
        .rd-card {
          margin: 10px;
        }
       </style>
       <md-card class="rd-card">
          <md-card-header>
            <md-card-title> 
              <a routerLink="/news/{{ card?.$key }}" routerLinkActive="active">{{ card?.title }}</a>
            </md-card-title>
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

    constructor(
        private af: AngularFire,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params
            .map((params: Params) => params['id'] )
            .subscribe(id => {
                if (id) {
                    this.af.database
                        .object(`/news/${id}`)
                        .subscribe((card) => {
                            if (card) {
                                this.card = card
                            }
                        });
                }
            });
    }
}