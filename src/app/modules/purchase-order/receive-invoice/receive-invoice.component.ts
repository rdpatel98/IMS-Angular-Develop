import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ReceiveInvoiceService} from "./receive-invoice.service";
import {BehaviorSubject, Observable} from "rxjs";
import {IItem} from "../../items/items.component";
import {LoginService} from "../../user/login/login.service";
import {MatTableDataSource} from "@angular/material/table";
import {ItemsService} from "../../items/items.service";
import {WarehouseService} from "../../warehouse/warehouse.service";
import {UomConvertionService} from "../../uom-convertion/uom-convertion.service";
import {VendorService} from "../../vendor/vendor.service";
import {PurchaseOrderService} from "../purchase-order.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-receive-invoice',
    templateUrl: './receive-invoice.component.html',
    styleUrls: ['./receive-invoice.component.css']
})
export class ReceiveInvoiceComponent implements OnInit {

    frm!: FormGroup;
    itemOptions!: IItem[];
    itemFiltered!: Observable<IItem[]>;

    items: any;

    warehouseAll: any;
    UomConvertionAll: any;
    vendorAll: any;
    _totalAmount: number = 0;
    po: any;
    poNo: any;
    vendorAccount: any;
    VendorName: any;
    btnSaveOption!: string;

    constructor(private _snackBar :MatSnackBar,private dialogRef: MatDialogRef<ReceiveInvoiceComponent>,private service: ReceiveInvoiceService, private fb: FormBuilder, private itemService: ItemsService, private whService: WarehouseService, private uomService: UomConvertionService, private vendorService: VendorService, private poService: PurchaseOrderService, @Inject(MAT_DIALOG_DATA) public info: any, private serviceLogin: LoginService) {
        itemService.getItem([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe((data) => {
            this.itemOptions = data['Result'];
            // this.data.forEach((d: TableData) => this.addRow(d, false));
            // this.updateView();
        });

        whService.getWarehouse([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(data => {
            this.warehouseAll = data['Result'];
        });

        vendorService.getVendors([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(data => {
            this.vendorAll = data['Result'];
        });

        uomService.getUomConversion([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(data => {
            this.UomConvertionAll = data['Result'];
        })

        console.log(this.info['IsPurchaseReceiveSaved'])
        console.log(this.info['id'])

        if (!this.info['IsPurchaseReceiveSaved']) {
            poService.getPOByID(this.info['id']).subscribe((data: any) => {

                console.log(data);
                this.po = data['Result']['PurchaseOrder'];

                this.poNo = this.po['PurchaseOrderNo'];
                this.VendorName = this.vendorAll.map((d: any) => {
                    return d.VendorId == this.po['VendorId'] ? d.Name : null;
                });
                this.vendorAccount = this.vendorAll.map((d: any) => {
                    return d.VendorId == this.po['VendorId'] ? d.AccountNumber : null;
                });


                data['Result']['PurchaseOrderItems'].forEach((d: TableData) => {
                    this.addRow(d);
                })

                this.frm.controls['PurchaseReceive'].patchValue(this.po);
            })
        } else {
            service.getPurchaseReceiveByPurchaseOrder(this.info['id']).subscribe((data: any) => {

                console.log(data);
                this.po = data['Result']['PurchaseReceive'];
                console.log(this.po['PurchaseReceiveNo']);
                this.poNo = this.po['PurchaseReceiveNo'];
                this.VendorName = this.vendorAll.map((d: any) => {
                    return d.VendorId == this.po['VendorId'] ? d.Name : null;
                });
                this.vendorAccount = this.vendorAll.map((d: any) => {
                    return d.VendorId == this.po['VendorId'] ? d.AccountNumber : null;
                });


                data['Result']['PurchaseReceiveItems'].forEach((d: TableData) => {
                    this.addRow(d);
                })

                this.frm.controls['PurchaseReceive'].patchValue(this.po);
            })
        }


    }

    // displayedColumns = ['no', 'item_no', 'item_desc', 'source', 'site', 'warehouse', 'qty', 'rec_unit', 'unit', 'unit_price', 'net_amt', 'vendor_batch', 'in_no', 'in_date'];
    displayedColumns = ['no', 'item_no', 'warehouse', 'qty', 'unit', 'unit_price', 'net_amt', 'ReceiveQuantity', 'BatchNo'];
    dataSource = new BehaviorSubject<AbstractControl[]>([]);
    rows: FormArray = this.fb.array([]);

    ngOnInit(): void {

        this.frm = this.fb.group({
            PurchaseReceive: this.fb.group({
                PurchaseReceiveId: [''],
                PurchaseOrderId: [''],
                VendorId: [''],
                NetAmount: [''],
                OrganizationId: [''],
            }),
            PurchaseReceiveItems: this.rows,
        })

    }

    log(e: any) {
        console.log(e);
    }

    addRow(d?: TableData, noUpdate?: boolean) {
        const row = this.fb.group({
            'LineNo': [d && d.LineNo ? d.LineNo : null, []],
            'ItemId': [d && d.ItemId ? d.ItemId : null, []],
            'WarehouseId': [d && d.WarehouseId ? d.WarehouseId : null, []],
            'Quantity': [d && d.Quantity ? d.Quantity : 0, []],
            'ReceiveQuantity': [d && d.ReceiveQuantity ? d.ReceiveQuantity : 0, []],
            'UnitId': [d && d.UnitId ? d.UnitId : null, []],
            'UnitPrice': [d && d.UnitPrice ? d.UnitPrice : 0, []],
            'NetAmount': [d && d.NetAmount ? d.NetAmount : 0, []],
            'BatchNo': [d && d.BatchNo ? d.BatchNo : null, []],
            'PurchaseReceiveItemsId': [d && d.PurchaseReceiveItemsId ? d.PurchaseReceiveItemsId : null, []],
            'PurchaseReceiveId': [d && d.PurchaseReceiveId ? d.PurchaseReceiveId : null, []],
        });
        this.rows.push(row);

        if (!noUpdate) {
            this.updateView();
        }
    }

    updateView() {
        this.dataSource.next(this.rows.controls);
    }

    getItem(ItemId: any): string {

        return this.itemOptions.filter((d: any) => d.ItemId == ItemId)[0]?.Name;
    }

    getWH(WarehouseId: any): string {

        return this.warehouseAll.filter((d: any) => d.WarehouseId == WarehouseId)[0]?.Name;
    }

    getUnit(UnitId: any): string {

        return this.UomConvertionAll.filter((d: any) => d.Id == UnitId)[0]?.Name;
    }

    onSubmit() {

        if (!this.info['IsPurchaseReceiveSaved']) {
            this.service.createPurchaseReceive(this.frm.value).subscribe(data => {
                console.log(data);
                this.dialogRef.close();
                this._snackBar.open("Receive Order Items Successfully!");
            })
        } else {
            if(this.btnSaveOption === 'save') {
                this.service.updatePurchaseReceive(this.frm.value).subscribe(data => {
                    console.log(data);
                    this.dialogRef.close();
                    this._snackBar.open("Updated Receive Order Items Successfully!");
                })
            }else if(this.btnSaveOption === 'saveAndInvoice'){
                this.service.updatePurchaseReceiveAndInvoice(this.frm.value).subscribe(data => {
                    console.log(data);
                    this.dialogRef.close();
                    this._snackBar.open("Receive and Invoice Order Items Successfully!");
                })
            }
        }


        console.log(this.frm.value);
    }

    getData(index: any, frmCtrl: any): string {
        var arrayControl = this.frm.get('PurchaseReceiveItems') as FormArray;
        return arrayControl.at(index).get(frmCtrl)?.value;

    }

    saveOption(option: string) {
        this.btnSaveOption = option;
    }

}

export interface PeriodicElement {
    no: string;
    item_no: string;
    item_desc: string;
    source: string;
    site: string;
    warehouse: string;
    qty: string;
    rec_unit: string;
    unit: string;
    unit_price: string;
    net_amt: string;
    vendor_batch: string;
    in_no: string;
    in_date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {no: '1', item_no: 'ITM001', item_desc: 'Item Description', source: '', site: '', warehouse: '', qty: '3', rec_unit: '3', unit: 'KG', unit_price: '200', net_amt: '600', vendor_batch: '', in_no: '', in_date: ''},
    {no: '2', item_no: 'ITM002', item_desc: 'Item Description', source: '', site: '', warehouse: '', qty: '3', rec_unit: '3', unit: 'KG', unit_price: '200', net_amt: '600', vendor_batch: '', in_no: '', in_date: ''},
    {no: '3', item_no: 'ITM003', item_desc: 'Item Description', source: '', site: '', warehouse: '', qty: '3', rec_unit: '3', unit: 'KG', unit_price: '200', net_amt: '600', vendor_batch: '', in_no: '', in_date: ''},
    {no: '4', item_no: 'ITM004', item_desc: 'Item Description', source: '', site: '', warehouse: '', qty: '3', rec_unit: '3', unit: 'KG', unit_price: '200', net_amt: '600', vendor_batch: '', in_no: '', in_date: ''},
    {no: '5', item_no: 'ITM005', item_desc: 'Item Description', source: '', site: '', warehouse: '', qty: '3', rec_unit: '3', unit: 'KG', unit_price: '200', net_amt: '600', vendor_batch: '', in_no: '', in_date: ''},
];

export interface TableData {
    LineNo?: string;
    ItemId?: any;
    WarehouseId?: string;
    Quantity?: number;
    UnitId?: string;
    UnitPrice?: number;
    NetAmount?: string;
    Unit?: string;
    ReceiveQuantity?: string;
    BatchNo?: string;
    PurchaseReceiveItemsId?: string;
    PurchaseReceiveId?: string;
}
