import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonConstants } from "../../shared/common.constant";
import { LoginService } from '../user/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  orgId: string;
  constructor(private http: HttpClient, private serviceLogin: LoginService) {
    this.orgId = [serviceLogin.currentUser()?.OrganizationId].toString();
  }


  createWorker(data: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/AddWorker", data);
  }

  getWorkerById(id: string) {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetWorkerByID?workerid=" + id);
  }

  getWorker() {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListWorker?organizationId=" + this.orgId.toString());
  }


  update(data: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/UpdateWorker", { Worker: data });
  }

  delete(id: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/DeleteWorker?workerid=" + id, {});
  }
}
