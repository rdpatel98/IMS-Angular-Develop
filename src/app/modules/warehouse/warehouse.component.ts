import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {CreateComponent} from './create/create.component';
import {WarehouseService} from "./warehouse.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { LoginService } from '../user/login/login.service';


@Component({
    selector: 'app-warehouse',
    templateUrl: './warehouse.component.html',
    styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements AfterViewInit {
    displayedColumns: string[] = ['Id', 'Name', 'action'];
    dataSource: any;
orgId : string;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor(public dialog: MatDialog, private service: WarehouseService, private _snackBar: MatSnackBar, private serviceLogin: LoginService) {
        this.orgId = [serviceLogin.currentUser()?.OrganizationId].toString();
        this.getInit();
    }

    getInit() {
        this.service.getWarehouse(this.orgId.toString()).subscribe(
            data => {
                this.dataSource = new MatTableDataSource<IWarehouse>(data['Result']);
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

export interface IWarehouse {
    Id: string;
    Name: string;
    WarehouseId: string;
    OrganizationId: string;
}

