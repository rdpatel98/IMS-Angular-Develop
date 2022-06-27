import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonConstants } from "../../shared/common.constant";
import { LoginService } from '../user/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private http: HttpClient, private serviceLogin: LoginService) {
  }


  createWorker(data: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "Worker/AddWorker", data);
  }

  getWorkerById(id: string) {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "Worker/GetWorkerByID?workerid=" + id);
  }

  getWorker() {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "Worker/ListWorker");
  }


  update(data: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "Worker/UpdateWorker", { Worker: data });
  }

  delete(id: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "Worker/DeleteWorker?workerid=" + id, {});
  }
}
