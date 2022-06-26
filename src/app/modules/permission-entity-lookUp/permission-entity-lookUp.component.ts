import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './create/create.component';
import { MatSnackBar } from "@angular/material/snack-bar";
import { PermissionEntityLookUpService } from "./permission-entity-lookUp.service";

@Component({
    selector: 'app-permission-entity-lookUp',
    templateUrl: './permission-entity-lookUp.component.html',
    styleUrls: ['./permission-entity-lookUp.component.css']
})
export class PermissionEntityLookUpComponent {
    displayedColumns: string[] = ['EntityName', 'LookUpNames', 'action'];
    dataSource: any;

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
                 
                //console.log('result', data);
                this.dataSource = new MatTableDataSource<IPermissionEntityLookUp>(data);
                //console.log('result', this.dataSource);
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
        // var data: any;
        // this.service.getPermissionEntityLookUpByEntityId(entityId).subscribe(
        //     res => {
        //         //console.log('res', res);

        //         data = res;
        //         //console.log('res4', data);
        //     });
        //  
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
