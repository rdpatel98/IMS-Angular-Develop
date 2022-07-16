import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './create/create.component';
import { MatSnackBar } from "@angular/material/snack-bar";
import { RoleService } from "./role.service";
import { Permission } from 'src/app/shared/common.constant';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.css']
})
export class RoleComponent {
    displayedColumns: string[] = ['Name', 'action'];
    dataSource: any;
    permission: any = Permission;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    constructor(public dialog: MatDialog, private service: RoleService, private _snackBar: MatSnackBar) {
        this.getInit();
    }

    ngOnInit(): void {
    }

    getInit() {
        this.service.getRoles().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<IRole>(data);
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



export interface IRole {
    Id: string;
    Name: string;
}
