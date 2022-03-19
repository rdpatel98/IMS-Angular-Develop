import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonConstants} from "../../shared/common.constant";

@Injectable({
    providedIn: 'root'
})
export class AddAddressService {

    constructor(private http: HttpClient) {
    }

    createAddress(data: any, id: any,type:any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/"+type, {"Addresses": [data], "MasterId": id});
    }

    updateAddress(data: any, id: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/UpdateAddress", {"Addresses": [data], "MasterId": id});
    }

    deleteAddress(addressId: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/DeleteAddress?addressId=" + addressId, {});
    }
}
