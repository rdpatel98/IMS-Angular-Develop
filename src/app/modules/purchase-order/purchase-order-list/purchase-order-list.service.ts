import { Injectable } from '@angular/core';
import {CommonConstants} from "../../../shared/common.constant";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderListService {

  constructor(private http: HttpClient) {}


  getPurchaseList() {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListPurchaseOrder");
  }

}
