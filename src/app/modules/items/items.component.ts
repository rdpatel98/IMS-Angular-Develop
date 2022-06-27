import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {CreateComponent} from './create/create.component';
import {IUOM} from "../uom/uom.component";
import {UomService} from "../uom/uom.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ItemsService} from "./items.service";
import {LoginService} from "../user/login/login.service";
import {DetailsComponent} from "./details/details.component";

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.css']
})
export class ItemsComponent implements AfterViewInit {
    displayedColumns: string[] = ['ItemNo', 'Name', 'Description', 'action'];
    dataSource: any;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor(public dialog: MatDialog, private service: ItemsService, private _snackBar: MatSnackBar, private serviceLogin: LoginService) {
        this.getInit();
    }

    ngOnInit(): void {
    }

    getInit() {
        this.service.getItem().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<IItem>(data['Result']);
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

    viewDetails(item:any) {
        const dialogRef = this.dialog.open(DetailsComponent, {
            disableClose: true,
            data: {"item":item},
            width: '800px',
        })
    }
}

export interface IItem {
    ItemId: string;
    Id: string;
    ItemNo: string;
    Name: string;
    Description: string;
    PurchaseUnitId: string;
    InventoryUnitId: string;
    MinStock: string;
    MaxStock: string;
    SourceOfOrigin: string;
    OrganizationId: string;
}
