import { Injectable } from '@angular/core';
import { CommonConstants } from '../../shared/common.constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryAdjustmentService {

  constructor(private http: HttpClient) { }

  saveInventoryAdjustment(data: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/SaveInventoryAdjustment", data);
  }

  getWorker(id: string) {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListWorker?organizationId=" + id);
  }

  getPrefixAutoValue(id: string) {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetPrefixByType?organizationId=" + id +"&type=ia");
  }

}
