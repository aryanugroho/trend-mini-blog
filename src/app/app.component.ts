import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-root',
  template: `
    <style>
      .rd-icon {
        padding: 0 15px;
      }
      .margin-right {
        margin-right: 15px;
      }
      .rd-spacer {
        flex: 1 1 auto;
      }
      .rd-link {
          cursor: pointer;
      }
      a {
          text-decoration: none;
          color: white;
      }
       a:link{
           color: white;
       }
       a:hover{
           color: white;
       }
       a:active{
           color: white;
       }
    </style>
    <md-toolbar color="primary">
        <span routerLink="/news" class="rd-link">Mini Blog for Reactive Developer</span>
        <span class="rd-spacer"></span>
        <div *ngIf="isLogin" routerLink="/admin" routerLinkActive="active" class="rd-link">
          <md-icon class="rd-icon">create</md-icon>
        </div>
        <!--div routerLink="/news" routerLinkActive="active" class="rd-link">
          <md-icon class="rd-icon">notifications</md-icon>
        </div-->
        <a href="https://github.com/ysyun/trend-mini-blog" target="_new">
          <span class="icon margin-right">
            <i class="fa fa-github"></i>
          </span>
        </a>
        <button *ngIf="!isLogin" (click)="login()">Login</button>
        <button *ngIf="isLogin" (click)="logout()">Logout</button>
    </md-toolbar>

    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  isLogin: boolean;
  constructor(private af: AngularFire) { }

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
