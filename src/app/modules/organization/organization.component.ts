import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './create/create.component';
import { OrganizationService } from "./organization.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Permission } from 'src/app/shared/common.constant';

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.css']
})
export class OrganizationComponent {
    displayedColumns: string[] = ['Id', 'Name', 'Description', 'action'];
    dataSource !: any;
    // firstTime: boolean = true;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    permission: any = Permission;
    constructor(public dialog: MatDialog, private service: OrganizationService, private _snackBar: MatSnackBar) {
        this.getInit();
        // if(this.firstTime)
        // {
        //     this.firstTime=false;
        //     location.reload();
        // }
        

    }

    getInit() {
        this.service.getOrganization().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<IOrganization>(data['Result']);
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
        this.service.deleteOrganization(id).subscribe(data => {
            this._snackBar.open("Deleted Successfully!");
            this.getInit();
        });
    }
}

export interface IOrganization {

    Id: string;
    Name: string;
    Description: string;
}


