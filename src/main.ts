import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { UserModel } from './app/_Models/user/user.model';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
export function getCurrentUser(){
  if (localStorage.getItem('currentUser')) {
    var userJson = localStorage.getItem('currentUser');
    var user =userJson !== null ? JSON.parse(userJson) : new UserModel();
    return <UserModel>user;
  }
  return new UserModel();
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
