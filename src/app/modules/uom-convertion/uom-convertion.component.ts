import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {CreateComponent} from './create/create.component';
import {MatSnackBar} from "@angular/material/snack-bar";
import {UomConvertionService} from "./uom-convertion.service";
import {LoginService} from "../user/login/login.service";

@Component({
    selector: 'app-uom-convertion',
    templateUrl: './uom-convertion.component.html',
    styleUrls: ['./uom-convertion.component.css']
})
export class UomConvertionComponent  {
    displayedColumns: string[] = ['Name', 'Description', 'action'];
    dataSource: any;
    orgId: string;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;


    constructor(public dialog: MatDialog, private service: UomConvertionService, private _snackBar: MatSnackBar, private serviceLogin: LoginService) {
        this.orgId = [serviceLogin.currentUser()?.OrganizationId].toString();
        this.getInit();
    }

    ngOnInit(): void {
    }

    getInit() {
        this.service.getUomConversion().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<UomConvertion>(data['Result']);
                this.dataSource.paginator = this.paginator;
            }
        )
    }

    create() {

        const dialogRef = this.dialog.open(CreateComponent, {
            disableClose: true,
            data: {ed: null},
            width: '700px',
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

export interface UomConvertion {
    Id: string;
    OrganizationId: string;
    Name: string;
    Description: string;
    FromUnitId: string;
    ToUnitId: string;
    Ratio: string;
}
