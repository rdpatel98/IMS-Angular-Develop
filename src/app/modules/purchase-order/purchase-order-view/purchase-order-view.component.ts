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
            //console.log(data);
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

    //
    // loadDD(index: string) {
    //     this.control = this.form.get('PurchaseOrderItems.' + index + '.ItemId') as FormControl;
    //     this.itemFiltered = this.control.valueChanges.pipe(
    //         startWith(''),
    //         map(value => (typeof value === 'string' ? value : value.name)),
    //         map(name => (name ? this._filter(name) : this.itemOptions.slice())),
    //     );
    // }

    // emptyTable() {
    //     while (this.rows.length !== 0) {
    //         this.rows.removeAt(0);
    //     }
    // }

    // deleteRow(index: number) {
    //     this.rows.removeAt(index);
    //     this.updateView();
    // }

    log(element: any) {
        //console.log(element)
    }

    // addRow(d?: TableData, noUpdate?: boolean) {
    //     const row = this.formBulider.group({
    //         'LineNo': [d && d.LineNo ? d.LineNo : null, []],
    //         'Unit': [d && d.Unit ? d.Unit : null, []],
    //         'ItemId': [d && d.ItemId ? d.ItemId : null, []],
    //         'WarehouseId': [d && d.WarehouseId ? d.WarehouseId : null, []],
    //         'Quantity': [d && d.Quantity ? d.Quantity : 1, []],
    //         'UnitId': [d && d.UnitId ? d.UnitId : null, []],
    //         'UnitPrice': [d && d.UnitPrice ? d.UnitPrice : 0, []],
    //         'NetAmount': [d && d.NetAmount ? d.NetAmount : 0, []],
    //     });
    //     this.rows.push(row);
    //     this.loadDD((this.rows.length - 1).toString());
    //     if (!noUpdate) {
    //         this.updateView();
    //     }
    // }

    // updateView() {
    //     this.dataSource.next(this.rows.controls);
    // }


    // displayFn(item: IItem): string {
    //     return item && item.Name ? item.Name : '';
    // }
    //
    // private _filter(name: string): IItem[] {
    //     const filterValue = name.toLowerCase();
    //
    //     return this.itemOptions.filter(option => option.Name.toLowerCase().includes(filterValue));
    // }

    // invoice() {
    //     const dialogRef = this.dialog.open(ReceiveInvoiceComponent, {
    //         disableClose: true,
    //         width: '1400px',
    //     });
    //
    // }


    // itemChangeUnit(eventValue: any, index: any) {
    //     this.form.get('PurchaseOrderItems.' + index + '.Unit')?.setValue(this.UomConvertionAll.filter((d: any) => d.Id == eventValue)[0]?.Name);
    // }

    // netAmount(index: string) {
    //     this.form.get('PurchaseOrderItems.' + index + '.NetAmount')?.setValue((this.form.get('PurchaseOrderItems.' + index + '.UnitPrice')?.value).toFixed(2) * (this.form.get('PurchaseOrderItems.' + index + '.Quantity')?.value).toFixed(2));
    //     this.totalAmount()
    // }

    // totalAmount() {
    //     this._totalAmount = this.form.value.PurchaseOrderItems.reduce((p: number, c: any) => p + Number(c.NetAmount), 0);
    // }

    // onSubmit() {
    //
    //     this.form.controls['PurchaseOrderItems'].setValue(this.form.value.PurchaseOrderItems.map((d: any, i = 0) => {
    //         return {
    //             ItemId: d.ItemId?.ItemId,
    //             LineNo: ++i,
    //             WarehouseId: d.WarehouseId,
    //             Quantity: d.Quantity,
    //             UnitId: d.UnitId,
    //             UnitPrice: d.UnitPrice,
    //             NetAmount: d.NetAmount,
    //             Unit: d.Unit
    //         }
    //     }));
    //
    //     this.form.get('PurchaseOrder.NetAmount')?.setValue(this._totalAmount);
    //
    //     //console.log(this.form.value);
    //
    //     this.poService.createPO(this.form.value).subscribe(data => //console.log(data));
    //
    // }

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
