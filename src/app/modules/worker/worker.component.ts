import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {CreateComponent} from './create/create.component';
import {IWarehouse} from "../warehouse/warehouse.component";
import {WorkerService} from "./worker.service";
import * as moment from "moment";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Permission } from 'src/app/shared/common.constant';

@Component({
    selector: 'app-worker',
    templateUrl: './worker.component.html',
    styleUrls: ['./worker.component.css']
})
export class WorkerComponent {
    displayedColumns: string[] = ['Name', 'UserId', 'DOJ', 'DOB', 'IsBlocked', 'action'];
    dataSource !: any;
    permission: any = Permission;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    constructor(public dialog: MatDialog, private service: WorkerService, private _snackBar: MatSnackBar) {
        this.getInit();
    }

    ngOnInit(): void {
    }

    getInit() {
        this.service.getWorker().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<IWorker>(data['Result']);
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


    returnDate(date: any) {
        return moment(date).format("DD/MM/yyyy")
    }

}

export interface IWorker {
    Name: string;
    DOJ: string;
    DOB: string;
    WorkerId: string;
    UserId: string;
    IsBlocked: boolean;
}

