import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonConstants} from "../../shared/common.constant";

@Injectable({
    providedIn: 'root'
})
export class ItemTypesService {
    constructor(private http: HttpClient) {
    }

    createItemTypes(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/AddItemType", data);
    }
    getItemTypes() {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListItemTypes");
    }
}
