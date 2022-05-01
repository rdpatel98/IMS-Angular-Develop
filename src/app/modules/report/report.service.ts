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

    getPrefixAutoValue(orgId: string) {

        return this.http.get(CommonConstants.WEBAPI_URL + "StoreAdmin/GetPrefixByType?organizationId=" + orgId + "&type=ic");
    }

    getWorker(id: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListWorker?organizationId=" + id);
    }

    getItemsWithCategoryByWarehouseId(org_id: string, wid: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetItemsWithCategoryByWarehouseId?warehouseId=" + wid + "&organizationId=" + org_id);
    }

    createItemConsumption(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/SaveItemConsumption", data);
    }

    GetItemCategoryReport(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/GetItemCategoryReport", data);
    }
    GetOnHandReport(data: any) {
        return this.http.post<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetOnHandReport", data);
    }
    GetPurchaseEnquiryReport(data: any) {
        return this.http.post<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetPurchaseEnquiryReport", data);
    }
    getPurchaseList(id: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListPurchaseOrder?organizationId=" + id);
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

