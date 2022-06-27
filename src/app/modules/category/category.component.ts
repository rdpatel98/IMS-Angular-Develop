import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './create/create.component';
import { FormGroup } from "@angular/forms";
import { IWorker } from "../worker/worker.component";
import { WorkerService } from "../worker/worker.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CategoryService } from "./category.service";
import { LoginService } from "../user/login/login.service";
import { Permission } from 'src/app/shared/common.constant';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent {
    displayedColumns: string[] = ['Id', 'Name', 'Description', 'action'];
    dataSource !: any;
    permission: any = Permission;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    constructor(public dialog: MatDialog, private service: CategoryService, private _snackBar: MatSnackBar, private serviceLogin: LoginService) {
        this.getInit();
    }

    ngOnInit(): void {
    }

    getInit() {
        this.service.getCategory().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<ICategory>(data['Result']);
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

export interface ICategory {
    CategoryId: string;
    OrganizationId: string;
    Id: string;
    Name: string;
    Description: string;
}
