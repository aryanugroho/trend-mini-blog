import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <md-toolbar color="primary">
        <span>Mini Blog for Reactive Developer</span>
        <span class="rd-spacer"></span>
        <div routerLink="/admin" routerLinkActive="active" class="rd-link">
          <md-icon class="rd-icon">description</md-icon>
        </div>
        <div routerLink="/news" routerLinkActive="active" class="rd-link">
          <md-icon class="rd-icon">add_alert</md-icon>
        </div>
    </md-toolbar>

    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {}

  ngOnInit() {
  }
}
