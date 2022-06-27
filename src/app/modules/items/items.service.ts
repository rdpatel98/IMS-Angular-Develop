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

    getItem() {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListItems");
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

    getVendorPriceListByItemId(itemId: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetVendorPriceListByItemId?itemId=" + itemId);
    }

    getAllTransactionsByItemId(itemId: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetAllTransactionsByItemId?itemId=" + itemId);
    }

    getCategoryByItemId(itemId: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetCategoryByItemId?itemId=" + itemId);
    }

    getOnHandQtyByItemId(itemId: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetOnHandQtyByItemId?itemId=" + itemId);
    }

}
