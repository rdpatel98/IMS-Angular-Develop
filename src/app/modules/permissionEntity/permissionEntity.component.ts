import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './create/create.component';
import { MatSnackBar } from "@angular/material/snack-bar";
import { PermissionEntityService } from "./permissionEntity.service";
import { Permission } from 'src/app/shared/common.constant';

@Component({
    selector: 'app-permissionEntity',
    templateUrl: './permissionEntity.component.html',
    styleUrls: ['./permissionEntity.component.css']
})
export class PermissionEntityComponent {
    displayedColumns: string[] = ['Name', 'action'];
    dataSource: any;
    permission: any = Permission;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    constructor(public dialog: MatDialog, private service: PermissionEntityService, private _snackBar: MatSnackBar) {
        this.getInit();
    }

    ngOnInit(): void {
    }

    getInit() {
        this.service.getPermissionEntitys().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<IPermissionEntity>(data);
                this.dataSource.paginator = this.paginator;
            }
        )
    }

    create() {

        const dialogRef = this.dialog.open(CreateComponent, {
            disableClose: true,
            data: { ed: null },
            width: '700px',
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getInit();
        });

    }

    edit(data: any) {
        const dialogRef = this.dialog.open(CreateComponent, {
            disableClose: true,
            data: { ed: data },
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



export interface IPermissionEntity {
    Id: string;
    Name: string;
}
