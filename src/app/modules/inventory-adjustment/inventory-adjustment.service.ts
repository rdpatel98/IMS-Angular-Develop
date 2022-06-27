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

  getWorker() {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "Worker/ListWorker");
  }

  getPrefixAutoValue() {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetPrefixByType?type=ia");
  }

  
  getIAByID(id:string){
    return this.http.get(CommonConstants.WEBAPI_URL + "StoreAdmin/GetInventoryAdjustmentByID?inventoryAdjustmentId="+id);
  }


}
