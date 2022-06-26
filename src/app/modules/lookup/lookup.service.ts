import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonConstants } from "../../shared/common.constant";
import { LoginService } from '../user/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LookUpService {
  orgId: string;
  constructor(private http: HttpClient, private serviceLogin: LoginService) {
    this.orgId = [serviceLogin.currentUser()?.OrganizationId].toString();
  }

  createLookUp(data: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "LookUp/CreateLookUp", data);
  }

  getLookUps() {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "LookUp/GetLookUps");
  }

  getLookUp(id: any) {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "LookUp/GetLookUp/" + id);
  }

  update(data: any, id: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "LookUp/UpdateLookUp/" + id, data);
  }

  delete(id: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "LookUp/DeleteLookUp/" + id, {});
  }
}
