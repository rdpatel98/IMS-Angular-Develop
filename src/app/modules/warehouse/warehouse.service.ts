import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonConstants} from "../../shared/common.constant";

@Injectable({
    providedIn: 'root'
})
export class WarehouseService {
    constructor(private http: HttpClient) {
    }

    createWarehouse(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/AddWarehouse", data);
    }

    getWarehouseById(id: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetWarehouseByID?warehouseid=" + id);
    }

    getWarehouse() {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListWarehouse");
    }


    update(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/UpdateWarehouse", {Warehouse: data});
    }

    delete(id: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/DeleteWarehouse?warehouseid=" + id, {});
    }
}
