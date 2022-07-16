import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { IItem } from "../../items/items.component";
import { LoginService } from "../../user/login/login.service";
import { MatDialog } from "@angular/material/dialog";
import { ItemsService } from "../../items/items.service";
import { WarehouseService } from "../../warehouse/warehouse.service";
import { UomConvertionService } from "../../uom-convertion/uom-convertion.service";
import { VendorService } from "../../vendor/vendor.service";
import { PurchaseOrderService } from "../purchase-order.service";
import { map, startWith } from "rxjs/operators";
import { ReceiveInvoiceComponent } from "../receive-invoice/receive-invoice.component";
import { TableData } from "../purchase-order.component";
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { IPurchaseOrder } from "../purchase-order-list/purchase-order-list.component";
import { ThrowStmt } from '@angular/compiler';

@Component({
    selector: 'app-purchase-order-view',
    templateUrl: './purchase-order-view.component.html',
    styleUrls: ['./purchase-order-view.component.css']
})
export class PurchaseOrderViewComponent implements OnInit {

    frm: FormGroup = new FormGroup({});

    control = new FormControl();

    streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
    filteredStreets!: Observable<string[]>;
    itemOptions!: IItem[];
    itemFiltered!: Observable<IItem[]>;

    items: any;

    warehouseAll: any;
    UomConvertionAll: any;
    vendorAll: any;
    _totalAmount: number = 0;

    data: TableData[] = [];
    dataSource: any;// = new BehaviorSubject<AbstractControl[]>([]);
    displayedColumns = ['no', 'item_no', 'warehouse', 'qty', 'unit', 'unit_price', 'net_amt'];
    _id!: any;
    rows: FormArray = this.formBulider.array([]);    
    poNo: any;
    poID: any;
    vendor: any;
    IsPurchaseReceiveSaved = false;


    // form: FormGroup = this.formBulider.group({
    //     'PurchaseOrder': this.formBulider.group({
    //         'PurchaseOrderNo': new FormControl('', Validators.required),
    //         'VendorId': new FormControl('', Validators.required),
    //         'NetAmount': [''],
    //         'OrganizationId': [serviceLogin.currentUser()?.OrganizationId],
    //         'OrderStatus': [1],
    //         'Status': [1]
    //     }),
    //     PurchaseOrderItems: this.rows,
    //     IsPurchaseReceiveSaved: [false]
    // });


    constructor(private formBulider: FormBuilder, private route: ActivatedRoute, public dialog: MatDialog, private itemService: ItemsService, private whService: WarehouseService, private uomService: UomConvertionService, private vendorService: VendorService, private poService: PurchaseOrderService, private serviceLogin: LoginService) {

        this._id = this.route.snapshot.paramMap.get('id');

        itemService.getItem().subscribe((data) => {
            this.itemOptions = data['Result'];
            // this.data.forEach((d: TableData) => this.addRow(d, false));
            // this.updateView();
        });

        whService.getWarehouse().subscribe(data => {
            this.warehouseAll = data['Result'];
        });

        vendorService.getVendors().subscribe(data => {
            this.vendorAll = data['Result'];
        });

        uomService.getUomConversion().subscribe(data => {
            this.UomConvertionAll = data['Result'];
        })


    }


    ngOnInit(): void {
        this.getInit();

    }


    getInit() {

        this.poService.getPOByID(this._id).subscribe((data: any) => {
            this.IsPurchaseReceiveSaved = data['Result']['IsPurchaseReceiveSaved'];
            this.dataSource = new MatTableDataSource<TableData>(data['Result']['PurchaseOrderItems']);
            this.poNo = data['Result']['PurchaseOrder']['PurchaseOrderNo'];
            this.poID = data['Result']['PurchaseOrder']['PurchaseOrderId'];
            this.getVendorById(data['Result']['PurchaseOrder']['VendorId']);
            
            this._totalAmount = data.Result.PurchaseOrderItems.reduce((p: number, c: any) => p + Number(c.NetAmount), 0);
        });
    }

    invoice() {
        const dialogRef = this.dialog.open(ReceiveInvoiceComponent, {
            disableClose: true,
            data: { IsPurchaseReceiveSaved: this.IsPurchaseReceiveSaved, id: this.poID },
            width: '1400px',
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getInit();
        });

    }

    log(element: any) {
    }


    getItem(ItemId: any): string | undefined {

        return this.itemOptions?.find((d: any) => d.ItemId == ItemId)?.Name;
    }

    getWH(WarehouseId: any): string | undefined {

        return this.warehouseAll?.find((d: any) => d.WarehouseId == WarehouseId)?.Name;
    }

    getUnit(UnitId: any): string | undefined {

        return this.UomConvertionAll?.find((d: any) => d.Id == UnitId)?.Name;
    }

    getVendorById(id: any) {
        return this.vendorService.getVendorById(id).subscribe(res => {
            this.vendor=res['Result']
        });
    }
}
