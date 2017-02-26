import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'card-add',
    template: ` 
        <md-input-container>
            <input mdInput type="text" placeholder="Title" value="">
            <input mdInput type="textarea" placeholder="Content" value="">
        </md-input-container>
    `
})
export class AddCardComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}