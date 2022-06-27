import { Injectable } from '@angular/core';
import { CommonConstants } from "../../shared/common.constant";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(private http: HttpClient) {
    }

    getItemsWithOnHandQtyByItemCategoryId(id: string, whId: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetItemsWithOnHandQtyByItemCategoryId?itemCategoryId=" + id + "&warehouseId=" + whId);
    }

    getPrefixAutoValue() {

        return this.http.get(CommonConstants.WEBAPI_URL + "StoreAdmin/GetPrefixByType?type=ic");
    }

    getWorker() {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "Worker/ListWorker");
    }
    getItem() {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListItems");
    }
    getVendors() {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListVendor");
    }
    getItemsWithCategoryByWarehouseId(wid: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetItemsWithCategoryByWarehouseId?warehouseId=" + wid);
    }

    createItemConsumption(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/SaveItemConsumption", data);
    }

    GetConsumptionReport(data: any) {
        return this.http.post<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetConsumptionReport", data);
    }
    GetOnHandReport(data: any) {
        return this.http.post<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetOnHandReport", data);
    }
    GetPurchaseEnquiryReport(data: any) {
        return this.http.post<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetPurchaseEnquiryReport", data);
    }
    getPurchaseList() {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListPurchaseOrder");
    }
}

export class ConsumptionReportFilter {
    fromDate: Date | undefined;
    toDate: Date | undefined;
    store: number | undefined;
    worker: number | undefined;
    itemType: number | undefined;
    organizationId: number | undefined;
}

