import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonConstants } from "../../shared/common.constant";
import { LoginService } from '../user/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionEntityLookUpService {
  orgId: string;
  constructor(private http: HttpClient, private serviceLogin: LoginService) {
    this.orgId = [serviceLogin.currentUser()?.OrganizationId].toString();
  }

  createPermissionEntityLookUp(data: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "PermissionEntityLookUp/CreatePermissionEntityLookUp", data);
  }

  getPermissionEntityLookUps() {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "PermissionEntityLookUp/GetPermissionEntityLookUps");
  }

  getPermissionEntityLookUpList() {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "PermissionEntityLookUp/GetPermissionEntityLookUpList");
  }

  getPermissionEntityLookUp(id: any) {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "PermissionEntityLookUp/GetPermissionEntityLookUp/" + id);
  }

  getPermissionEntityLookUpByEntityId(entityId: any) {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "PermissionEntityLookUp/GetPermissionEntityLookUpByEntityId/" + entityId);
  }

  update(data: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "PermissionEntityLookUp/UpdatePermissionEntityLookUp", data);
  }

  delete(id: any) {
    return this.http.delete(CommonConstants.WEBAPI_URL + "PermissionEntityLookUp/DeletePermissionEntityLookUpByEntity/" + id);
  }

  getEntities() {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "PermissionEntityLookUp/GetPermissionEntities");
  }
  
  getLookups() {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "PermissionEntityLookUp/GetLookUps");
  }
}
