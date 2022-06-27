import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonConstants } from 'src/app/shared/common.constant';

@Injectable({
  providedIn: 'root'
})
export class InventoryAdjustmentListService {

  constructor(private http: HttpClient) { }


  getInventoryAdjustmentList() {
    return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListInventoryAdjustment");
  }
}
