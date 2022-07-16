import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {CreateComponent} from './create/create.component';
import {MatSnackBar} from "@angular/material/snack-bar";
import {VendorService} from "./vendor.service";
import {LoginService} from "../user/login/login.service";
import { Permission } from 'src/app/shared/common.constant';

@Component({
    selector: 'app-vendor',
    templateUrl: './vendor.component.html',
    styleUrls: ['./vendor.component.css']
})
export class VendorComponent {
    displayedColumns: string[] = ['Id', 'Name', 'AccountNumber', 'action'];
    dataSource !: any;
    permission: any = Permission;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;


    constructor(public dialog: MatDialog, private service: VendorService, private _snackBar: MatSnackBar, private serviceLogin: LoginService) {
        this.getInit();
    }


    ngOnInit(): void {
    }

    getInit() {
        this.service.getVendors().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<IVendor>(data['Result']);
                this.dataSource.paginator = this.paginator;
            }
        )
    }

    create() {
        const dialogRef = this.dialog.open(CreateComponent, {
            disableClose: true,
            data: {ed: null},
            width: '500px',
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getInit();
        });
    }


    edit(data: any) {
        const dialogRef = this.dialog.open(CreateComponent, {
            disableClose: true,
            data: {ed: data},
            width: '700px',
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getInit();
        });
    }

    delete(id: any) {
        this.service.delete(id).subscribe(data => {
            this._snackBar.open("Deleted Successfully!");
            this.getInit();
        });
    }
}

export interface IVendor {
    VendorId: string;
    Id: string;
    Name: string;
    AccountNumber: string;
    OrganizationId: string;
}

