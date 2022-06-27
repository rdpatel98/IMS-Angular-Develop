import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonConstants} from "../../shared/common.constant";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) {
    }

    createCategory(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/AddCategory", data);
    }

    getCategoryById(id: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetCategoryByID?categoryId=" + id);
    }

    getCategory() {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListCategory");
    }


    update(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/UpdateCategory", data);
    }

    delete(id: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/DeleteCategory?categoryId=" + id, {});
    }
}
