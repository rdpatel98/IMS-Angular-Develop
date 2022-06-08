import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonConstants, DefaultWarehouseId, OrgId } from "../../../shared/common.constant";
import { Route, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    user: any;
    _orgId             !: string;
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

    public currentUser(): any {
        if (!this.user) {
            this.user = JSON.parse(localStorage.getItem('user') || '{}');
        }
        return this.user;
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
