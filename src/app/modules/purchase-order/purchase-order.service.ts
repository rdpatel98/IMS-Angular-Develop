import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonConstants} from "../../shared/common.constant";

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor(private http: HttpClient) {
  }

  createPO(data: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/AddPurchaseOrder", data);
  }


  updatePO(data: any) {
    return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/UpdatePurchaseOrder", data);
  }

  getPOByID(id:string){
    return this.http.get(CommonConstants.WEBAPI_URL + "StoreAdmin/GetPurchaseOrderByID?purchaseOrderId="+id);
  }

  getPrefixAutoValue() {

    return this.http.get(CommonConstants.WEBAPI_URL + "StoreAdmin/GetPrefixByType&type=po");
  }

  getPurchaseOrderUnitPriceByItemId(itemId:string) {

    return this.http.get(CommonConstants.WEBAPI_URL + "StoreAdmin/GetPurchaseOrderUnitPriceByItemId?itemId="+itemId);
  }
}
