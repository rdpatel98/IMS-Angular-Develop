import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonConstants} from "../../shared/common.constant";

@Injectable({
    providedIn: 'root'
})
export class VendorService {

    constructor(private http: HttpClient) {
    }

    createVendor(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/AddVendor", data);
    }

    getVendorById(id: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetVendorByID?vendorid=" + id);
    }

    getVendors() {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListVendor");
    }


    update(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/UpdateVendor", {Vendor: data});
    }

    delete(id: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/DeleteVendor?vendorid=" + id, {});
    }
}
