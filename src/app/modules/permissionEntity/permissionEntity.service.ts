import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonConstants } from "../../shared/common.constant";
import { LoginService } from '../user/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionEntityService {
  orgId: string;
  constructor(private http: HttpClient, private serviceLogin: LoginService) {
    this.orgId = [serviceLogin.currentUser()?.OrganizationId].toString();
  }

  createPermissionEntity(data: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "PermissionEntity/CreatePermissionEntity", data);
  }

  getPermissionEntitys() {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "PermissionEntity/GetPermissionEntities");
  }

  getPermissionEntity(id: any) {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "PermissionEntity/GetPermissionEntity/" + id);
  }

  update(data: any, id: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "PermissionEntity/UpdatePermissionEntity/" + id, data);
  }

  delete(id: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "PermissionEntity/DeletePermissionEntity/" + id, {});
  }
}
