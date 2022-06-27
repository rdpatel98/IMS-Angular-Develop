import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonConstants, DefaultWarehouseId, OrgId } from "../../../shared/common.constant";
import { Route, Router } from "@angular/router";
import { UserModel } from 'src/app/_Models/user/user.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    user: any;
    _orgId!: string;
    _defaultWarehouseId!: string;

    constructor(private http: HttpClient, private router: Router) {

    }

    public login(data: any) {
        var request = `grant_type=password&userName=${data.UserId}&password=${data.Password}`;
        const options = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        };
        return this.http.post(CommonConstants.LOGIN_URL + "token", request, options);
    }
    public setUser() {
        return this.http.get<any>(CommonConstants.LOGIN_URL + "api/Account/UserInfo");
    }
    public currentUser(): any {
        if (localStorage.getItem('currentUser')) {
            var userJson = localStorage.getItem('currentUser');
            var user =userJson !== null ? JSON.parse(userJson) : new UserModel();
            return <UserModel>user;
          }
          return new UserModel();
    }


    logout() {

        this.user = null as any;
        localStorage.clear();

        this.router.navigate(['/login'])

    }

    getOrgId() {
        return this.user['OrganizationId'];
    }

    getDefaultWarehouseId() {
        return this.user['DefaultWarehouseId'];
    }

    getUserId() {
        return this.user['UserId'];
    }

    getUserName() {
        return this.user['UserName'];
    }

}
