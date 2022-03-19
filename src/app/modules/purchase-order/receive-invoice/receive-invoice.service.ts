import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonConstants} from "../../../shared/common.constant";

@Injectable({
    providedIn: 'root'
})
export class ReceiveInvoiceService {

    constructor(private http: HttpClient) {
    }

    createPurchaseReceive(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/AddPurchaseReceive", data);
    }

    updatePurchaseReceive(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/SavePurchaseReceive", data);
    }

    updatePurchaseReceiveAndInvoice(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/SaveInvoice", data);
    }

    getPurchaseReceiveByPurchaseOrder(id: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetPurchaseReceiveByPurchaseOrder?purchaseOrderId=" + id);
    }

}
