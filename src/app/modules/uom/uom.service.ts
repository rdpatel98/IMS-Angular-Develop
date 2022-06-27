import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonConstants } from "../../shared/common.constant";
import { LoginService } from '../user/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class UomService {
  constructor(private http: HttpClient, private serviceLogin: LoginService) {
  }

  createUOM(data: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/AddUnit", data);
  }

  getUOM() {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListUnits");
  }

  update(data: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/UpdateUnit", data);
  }

  delete(id: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/DeleteUnit?unitid=" + id, {});
  }
}
