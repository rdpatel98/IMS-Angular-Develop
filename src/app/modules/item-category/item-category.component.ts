import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { CreateComponent } from "./create/create.component";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { CategoryService } from "../category/category.service";
import { LoginService } from "../user/login/login.service";
import { ICategory } from "../category/category.component";
import { ItemCategoryService } from "./item-category.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-item-category',
    templateUrl: './item-category.component.html',
    styleUrls: ['./item-category.component.css']
})
export class ItemCategoryComponent {
    displayedColumns: string[] = ['id', 'name', 'action'];
    displayedItemColumns: string[] = ['item_code', 'item_name'];
    dataSource: any;
    dataItemSource: any;
    ItemCategoryName!: string;
    orgId: string;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;


    constructor(public dialog: MatDialog, private service: ItemCategoryService, private serviceLogin: LoginService, private _snackBar: MatSnackBar) {
        this.orgId = [serviceLogin.currentUser()?.OrganizationId].toString();
    }

    ngOnInit(): void {
        this.get();
    }

    get() {
        this.service.getListItemCategory(this.orgId.toString()).subscribe(
            data => {
                this.dataSource = new MatTableDataSource<ItemCategory>(data['Result']);
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
            this.get();
        });
    }

    getItemView(element: any) {
        this.ItemCategoryName = "for " + element.CategoryName;
        this.service.getItemsByItemCategoryId(element.ItemCategoryId).subscribe(
            data => {
                this.dataItemSource = new MatTableDataSource<IItem>(data['Result']['ItemCategoryCollections']);
                this.dataItemSource.paginator = this.paginator;
            }
        )
    }

    edit(data: any) {
        const dialogRef = this.dialog.open(CreateComponent, {
            disableClose: true,
            data: { ed: data },
            width: '700px',
        });

        dialogRef.afterClosed().subscribe(result => {
            this.get();
        });
    }
    delete(data: any) {
        this.service.delete(data.CategoryId, data.ItemCategoryId).subscribe(
            data => {
                this._snackBar.open("Deleted Successfully!");
                this.get();
            }
        );
    }
}

export interface ItemCategory {
    ItemCategoryId: string;
    CategoryId: string;
    CategoryName: string;
}

export interface IItem {
    ItemName: string;
}

export interface PeriodicElement {
    id: string;
    name: string;
    description: string;
}

export interface PeriodicItemElement {
    item_code: string;
    item_name: string;
}


