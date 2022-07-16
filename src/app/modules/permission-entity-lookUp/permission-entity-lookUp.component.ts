import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './create/create.component';
import { MatSnackBar } from "@angular/material/snack-bar";
import { PermissionEntityLookUpService } from "./permission-entity-lookUp.service";
import { Permission } from 'src/app/shared/common.constant';

@Component({
    selector: 'app-permission-entity-lookUp',
    templateUrl: './permission-entity-lookUp.component.html',
    styleUrls: ['./permission-entity-lookUp.component.css']
})
export class PermissionEntityLookUpComponent {
    displayedColumns: string[] = ['EntityName', 'LookUpNames', 'action'];
    dataSource: any;
    permission: any = Permission;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    constructor(public dialog: MatDialog, private service: PermissionEntityLookUpService, private _snackBar: MatSnackBar) {
        this.getInit();
    }

    ngOnInit(): void {
    }

    getInit() {
        this.service.getPermissionEntityLookUpList().subscribe(
            data => {
                 
                this.dataSource = new MatTableDataSource<IPermissionEntityLookUp>(data);
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

    edit(entityId: any) {
        const dialogRef = this.dialog.open(CreateComponent, {
            disableClose: true,
            data: { ed: entityId },
            width: '700px',
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getInit();
        });
    }

    delete(entityId: any) {
        this.service.delete(entityId).subscribe(data => {
            this._snackBar.open("Deleted Successfully!");
            this.getInit();
        });
    }

}



export interface IPermissionEntityLookUp {
    EntityId: number;
    EntityName: string;
    LookUpNames: string;
}
