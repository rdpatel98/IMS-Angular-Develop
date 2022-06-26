import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonConstants } from "../../shared/common.constant";
import { LoginService } from '../user/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  orgId: string;
  constructor(private http: HttpClient, private serviceLogin: LoginService) {
    this.orgId = [serviceLogin.currentUser()?.OrganizationId].toString();
  }

  createRole(data: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "Role/CreateRole", data);
  }

  getRoles() {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "Role/GetRoles");
  }

  getRole(id: any) {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "Role/GetRole/" + id);
  }

  update(data: any, id: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "Role/UpdateRole/" + id, data);
  }

  delete(id: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "Role/DeleteRole/" + id, {});
  }
}
