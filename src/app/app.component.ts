import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-root',
  template: `
    <style>
      .rd-title {
        cursor: pointer;
      }
    </style>
    <md-toolbar color="primary">
        <span routerLink="/news" class="rd-title">Mini Blog for Reactive Developer</span>
        <span class="rd-spacer"></span>
        <div *ngIf="isLogin" routerLink="/admin" routerLinkActive="active" class="rd-link">
          <md-icon class="rd-icon">create</md-icon>
        </div>
        <div routerLink="/news" routerLinkActive="active" class="rd-link">
          <md-icon class="rd-icon">add_alert</md-icon>
        </div>
        <button *ngIf="!isLogin" (click)="login()">Login</button>
        <button *ngIf="isLogin" (click)="logout()">Logout</button>
    </md-toolbar>

    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogin: boolean;
  constructor(private af: AngularFire) {}

  ngOnInit() {
    const uid = localStorage.getItem('uid');
    if (uid) {
      this.isLogin = true;
    }
  }

  login() {
    this.af.auth
      .login({
        provider: AuthProviders.Google,
        method: AuthMethods.Popup
      })
      .then((response) => {
        if (response.uid) {
          this.isLogin = true;
          localStorage.setItem('uid', response.uid);
        }
      });
  }

  logout() {
     this.af.auth
      .logout()
      .then(() => {
        this.isLogin = false;
        localStorage.removeItem('uid');
      });
  }
}
