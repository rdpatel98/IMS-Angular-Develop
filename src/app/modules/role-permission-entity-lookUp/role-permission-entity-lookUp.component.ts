import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './create/create.component';
import { MatSnackBar } from "@angular/material/snack-bar";
import { RolePermissionEntityLookUpService } from './role-permission-entity-lookUp.service';
import { RoleService } from '../role/role.service';

@Component({
    selector: 'app-role-permission-entity-lookUp',
    templateUrl: './role-permission-entity-lookUp.component.html',
    styleUrls: ['./role-permission-entity-lookUp.component.css']
})
export class RolePermissionEntityLookUpComponent {
    displayedColumns: string[] = ['Name', 'action'];
    dataSource: any;
    roles : any;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    constructor(public dialog: MatDialog,
                private service: RolePermissionEntityLookUpService,
                private _snackBar: MatSnackBar,
                private roleService : RoleService) {
        this.getInit();
        this.roleService.getRoles().subscribe(data => {
            this.roles = data;
        });
    }

    ngOnInit(): void {
    }

    getInit() {
        this.service.getRolePermissionEntityLookUps().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<IRolePermissionEntityLookUp>(data['Result']);
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



export interface IRolePermissionEntityLookUp {
    Id: string;
    Name: string;
}
