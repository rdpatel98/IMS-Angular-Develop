import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonConstants } from "../../shared/common.constant";
import { LoginService } from '../user/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionEntityLookUpService {
  orgId: string;
  constructor(private http: HttpClient, private serviceLogin: LoginService) {
    this.orgId = [serviceLogin.currentUser()?.OrganizationId].toString();
  }

  createRolePermissionEntityLookUp(data: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "PermissionEntityLookUp/CreateRolePermissionEntityLookUp", data);
  }

  getRolePermissionEntityLookUps() {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "PermissionEntityLookUp/GetRolePermissionEntityLookUps");
  }

  getRolePermissionEntityLookUp(id: any) {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "PermissionEntityLookUp/GetRolePermissionEntityLookUp/" + id);
  }

  update(data: any, id: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "PermissionEntityLookUp/UpdateRolePermissionEntityLookUp/" + id, data);
  }

  delete(id: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "PermissionEntityLookUp/DeleteRolePermissionEntityLookUp/" + id, {});
  }
}
