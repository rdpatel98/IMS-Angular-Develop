import { Injectable } from '@angular/core';
import { CommonConstants } from "../../shared/common.constant";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ItemConsumptionService {

    constructor(private http: HttpClient) {
    }

    getItemsWithOnHandQtyByItemCategoryId(id: string, whId: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetItemsWithOnHandQtyByItemCategoryId?itemCategoryId=" + id + "&warehouseId=" + whId);
    }

    getPrefixAutoValue() {

        return this.http.get(CommonConstants.WEBAPI_URL + "StoreAdmin/GetPrefixByType&type=ic");
    }

    getWorker() {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListWorker");
    }

    getItemsWithCategoryByWarehouseId(wid: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetItemsWithCategoryByWarehouseId?warehouseId=" + wid);
    }

    createItemConsumption(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/SaveItemConsumption", data);
    }

}
