import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {ItemsService} from "../items.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {IItem} from "../items.component";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements AfterViewInit {

    displayedVendorColumns: string[] = ['VendorNo', 'VendorName', 'UnitPrice', 'OrderDate'];
    dataSourceVendor: any;

    displayedTransactionColumns: string[] = ['TransactionDate', 'Reference', 'RefNo', 'Quantity', 'LotNo'];
    dataSourceTransaction: any;

    displayedCategoryColumns: string[] = ['CategoryName'];
    dataSourceCategory: any;

    displayedOnHandQtyColumns: string[] = ['WarehouseName', 'Unit', 'OnHandQuantity'];
    dataSourceOnHandQty: any;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild('paginatorTransaction') paginatorTransaction!: MatPaginator;
    @ViewChild('paginatorCategory') paginatorCategory!: MatPaginator;
    @ViewChild('paginatorTOnHandQty') paginatorTOnHandQty!: MatPaginator;
    itemName: string;

    ngAfterViewInit() {
        this.dataSourceVendor.paginator = this.paginator;
        this.dataSourceTransaction.paginator = this.paginatorTransaction;
        this.dataSourceCategory.paginator = this.paginatorCategory;
        this.dataSourceOnHandQty.paginator = this.paginatorTOnHandQty;
    }

    constructor(private service: ItemsService, @Inject(MAT_DIALOG_DATA) public info: any) {

        console.log(info);
        let itemId = info['item']['ItemId']
        this.itemName = info['item']['Name'];
        service.getVendorPriceListByItemId(itemId, info['CatId']).subscribe((data: any) => {
            this.dataSourceVendor = new MatTableDataSource<IVendor>(data['Result']);
            this.dataSourceVendor.paginator = this.paginator;
        });
        service.getAllTransactionsByItemId(itemId, info['CatId']).subscribe((data: any) => {
            this.dataSourceTransaction = new MatTableDataSource<ITransactions>(data['Result']);
            this.dataSourceTransaction.paginator = this.paginatorTransaction;
        });
        service.getCategoryByItemId(itemId, info['CatId']).subscribe((data: any) => {
            this.dataSourceCategory = new MatTableDataSource<ICategory>(data['Result']);
            this.dataSourceCategory.paginator = this.paginatorCategory;
        });
        service.getOnHandQtyByItemId(itemId, info['CatId']).subscribe((data: any) => {
            console.log(data);
            this.dataSourceOnHandQty = new MatTableDataSource<IOnHand>(data['Result']);
            this.dataSourceOnHandQty.paginator = this.paginatorTOnHandQty;
        });

    }

    ngOnInit(): void {
    }

}


export interface IVendor {
    VendorNo: string;
    VendorName: string;
    UnitPrice: string;
    OrderDate: string;
}

export interface ITransactions {
    TransactionDate: string;
    Reference: string;
    RefNo: string;
    Quantity: string;
    LotNo: string;
}

export interface ICategory {
    CategoryName: string;
}

export interface IOnHand {
    WarehouseName: string;
    Unit: string;
    OnHandQuantity: string;
}
