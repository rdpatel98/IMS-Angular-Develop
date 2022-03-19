import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonConstants} from "../../shared/common.constant";

@Injectable({
    providedIn: 'root'
})
export class ItemsService {
    constructor(private http: HttpClient) {
    }

    createItem(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/AddItems", data);
    }

    getItem(id: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListItems?organizationId=" + id);
    }

    getItemById(id: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/LGetItemsByID?itemid=" + id);
    }


    update(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/UpdateItems", data);
    }

    delete(id: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/DeleteItem?itemId=" + id, {});
    }

    getVendorPriceListByItemId(itemId: string, catId: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetVendorPriceListByItemId?itemId=" + itemId + "&organizationId=" + catId);
    }

    getAllTransactionsByItemId(itemId: string, catId: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetAllTransactionsByItemId?itemId=" + itemId + "&organizationId=" + catId);
    }

    getCategoryByItemId(itemId: string, catId: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetCategoryByItemId?itemId=" + itemId + "&organizationId=" + catId);
    }

    getOnHandQtyByItemId(itemId: string, catId: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetOnHandQtyByItemId?itemId=" + itemId + "&organizationId=" + catId);
    }

}
