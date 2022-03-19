import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CommonConstants} from "../../shared/common.constant";

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {

    constructor(private http: HttpClient) {
    }

    createOrganization(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/AddOrganization", data);
    }

    getOrganizationById(id: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetOrganizationByID?organizationid=" + id);
    }

    getOrganization() {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListOrganization");
    }

    updateOrganization(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/UpdateOrganization", {Organization: data});
    }

    deleteOrganization(id: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/DeleteOrganization?organizationId="+id, {});
    }
}
