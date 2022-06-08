import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonConstants } from "../../shared/common.constant";
import { LoginService } from '../user/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ItemTypeService {
  orgId: string;
  constructor(private http: HttpClient, private serviceLogin: LoginService) {
    this.orgId = [serviceLogin.currentUser()?.OrganizationId].toString();
  }

  createItemTypes(data: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/AddItemType", data);
  }

  update(data: any) {
    debugger;
    return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/UpdateItemType", data);
  }

  delete(id: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/DeleteItemType?itemTypeid=" + id, {});
  }

  getItemTypebyId(id: any) {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetItemTypeByID",);
  }
  getItemTypes() {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListItemTypes");
  }
}
