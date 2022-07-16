import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonConstants } from "src/app/shared/common.constant";
import { UserModel } from "src/app/_Models/user/user.model";

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
  constructor(private http: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.url = CommonConstants.LOGIN_URL;

    if (this.url.charAt(this.url.length - 1) == '/')
      this.url = this.url.substring(0, this.url.length - 1);

  }
  public url: string;
  
  getCurrentUser(): UserModel {
    var userJson = localStorage.getItem('currentUser');
    var user =userJson !== null ? JSON.parse(userJson) : new UserModel();
    if (user && user.Permissions && localStorage.getItem('currentUser')) {
      localStorage.setItem('currentUser', JSON.stringify(user));

    }
    return <UserModel>user;
  }
}