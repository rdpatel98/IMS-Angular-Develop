import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { OrganizationService } from "../../organization/organization.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { CreateComponent } from "../../organization/create/create.component";
import { IOrganization } from "../../organization/organization.component";
import { PurchaseOrderListService } from "./purchase-order-list.service";
import { LoginService } from "../../user/login/login.service";
import { VendorService } from "../../vendor/vendor.service";

@Component({
    selector: 'app-purchase-order-list',
    templateUrl: './purchase-order-list.component.html',
    styleUrls: ['./purchase-order-list.component.css']
})
export class PurchaseOrderListComponent {

    displayedColumns: string[] = ['Id', 'PurchaseOrderNo', 'VendorId', 'NetAmount', 'OrderStatus', 'action'];
    dataSource !: any;
    vendorAll: any;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    orgId: string;
    constructor(public dialog: MatDialog, private service: PurchaseOrderListService, private _snackBar: MatSnackBar, private vendorService: VendorService, private serviceLogin: LoginService) {

        this.orgId = [serviceLogin.currentUser()?.OrganizationId].toString();
        this.vendorService.getVendors([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(data => {
            this.vendorAll = data['Result'];
        })
        this.getInit();
    }

    getInit() {
        this.service.getPurchaseList(this.orgId.toString()).subscribe(
            data => {
                this.dataSource = new MatTableDataSource<IPurchaseOrder>(data['Result']);
                this.dataSource.paginator = this.paginator;
            }
        )
    }

    getVendor(id: string): string {
        return this.vendorAll.filter((d: any) => d.VendorId == id)[0]?.Name;
    }

}

export interface IPurchaseOrder {
    PurchaseOrderId: string;
    PurchaseOrderNo: string;
    VendorId: string;
    NetAmount: string;
    OrderStatus: string;
    Status: string;
    OrganizationId: string;
}
