import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonConstants} from "../../shared/common.constant";

@Injectable({
    providedIn: 'root'
})
export class ItemCategoryService {

    constructor(private http: HttpClient) {
    }

    create(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/AddItemCategory", data);
    }

    update(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/UpdateItemCategory", data);
    }

    getListItemCategory(id: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListItemCategory?organizationId=" + id);
    }

    getItemsByItemCategoryId(id:string){
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetItemCategoryById?itemCategoryId=" + id);
    }


    getItemCategoryById(catId: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetItemCategoryById?itemCategoryId=" + catId);
    }

    delete(categoryId: any,itemCategoryId : any) {
        return this.http.delete<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/DeleteItemCategory/"+categoryId+"/"+itemCategoryId);
    }
}
