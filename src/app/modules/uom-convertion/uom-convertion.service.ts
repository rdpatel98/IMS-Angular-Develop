import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonConstants} from "../../shared/common.constant";
import { LoginService } from '../user/login/login.service';

@Injectable({
    providedIn: 'root'
})
export class UomConvertionService {
    orgId: string;
    constructor(private http: HttpClient, private serviceLogin: LoginService) {
      this.orgId = [serviceLogin.currentUser()?.OrganizationId].toString();
    }

    createUomConversion(data: any) {
            return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/AddUomConversion", data);
    }


    getUomConversion(id: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/ListUOMConversion?organizationId=" + id);
    }

    getUomConversionById(id: string) {
        return this.http.get<any>(CommonConstants.WEBAPI_URL + "StoreAdmin/GetUomConversionByID?uomId=" + id);
    }


    update(data: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/UpdateUomConversion", data);
    }

    delete(id: any) {
        return this.http.post(CommonConstants.WEBAPI_URL + "StoreAdmin/DeleteUomConversion?uomConversionId=" + id, {});
    }
}
