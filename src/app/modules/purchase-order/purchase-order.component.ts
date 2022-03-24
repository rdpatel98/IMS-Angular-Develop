import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { AbstractControl, FormArray, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReceiveInvoiceComponent } from './receive-invoice/receive-invoice.component';
import { map, startWith } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { ItemsService } from "../items/items.service";
import { IItem } from "../items/items.component";
import { WarehouseService } from "../warehouse/warehouse.service";
import { UomConvertionService } from "../uom-convertion/uom-convertion.service";
import { VendorService } from "../vendor/vendor.service";
import { PurchaseOrderService } from "./purchase-order.service";
import { Router } from "@angular/router";
import { LoginService } from '../user/login/login.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-purchase-order',
    templateUrl: './purchase-order.component.html',
    styleUrls: ['./purchase-order.component.css']
})

export class PurchaseOrderComponent implements OnInit {
    frm: FormGroup = new FormGroup({});
    defaultWarehouseId: any;
    control = new FormControl();

    streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
    itemOptions!: IItem[];
    itemFiltered!: Observable<IItem[]>;
    vendorAccount = "";
    items: any;
    orgId: string;

    warehouseAll: any;
    UomConvertionAll: any;
    vendorAll: any;
    _totalAmount: number = 0;

    data: TableData[] = [{ LineNo: '', Unit: '', ItemId: '', WarehouseId: '', Quantity: 1, UnitId: '', UnitPrice: 0, NetAmount: '0', SourceOfOriginName: '' }];
    dataSource = new BehaviorSubject<AbstractControl[]>([]);
    displayedColumns = ['no', 'item_no', 'warehouse', 'SourceOfOriginName', 'qty', 'unit', 'unit_price', 'net_amt', 'action'];

    rows: FormArray = this.formBulider.array([]);

    form!: FormGroup;
    isSaving = false;

    constructor(private router: Router, private _snackBar: MatSnackBar, private formBulider: FormBuilder, public dialog: MatDialog, private itemService: ItemsService, private whService: WarehouseService, private uomService: UomConvertionService, private vendorService: VendorService, private poService: PurchaseOrderService, private serviceLogin: LoginService) {
        this.defaultWarehouseId = serviceLogin.currentUser()?.DefaultWarehouseId;
        this.orgId = [serviceLogin.currentUser()?.OrganizationId].toString();
        itemService.getItem(this.orgId.toString()).subscribe((data) => {
            this.itemOptions = data['Result'];
            this.data.forEach((d: TableData) => this.addRow(d, false));
            this.updateView();
        });

        poService.getPrefixAutoValue(this.orgId.toString()).subscribe((data: any) => {
            this.form.get('PurchaseOrder.PurchaseOrderNo')?.setValue(data['Result']);
        })

        whService.getWarehouse(this.orgId.toString()).subscribe(data => {
            this.warehouseAll = data['Result'];
        });

        vendorService.getVendors(this.orgId.toString()).subscribe(data => {
            this.vendorAll = data['Result'];
        });

        uomService.getUomConversion(this.orgId.toString()).subscribe(data => {
            this.UomConvertionAll = data['Result'];

            console.log(this.UomConvertionAll)
        })
    }


    ngOnInit(): void {
        this.form = this.formBulider.group({
            'PurchaseOrder': this.formBulider.group({
                'PurchaseOrderNo': new FormControl('', Validators.required),
                'VendorId': new FormControl('', Validators.required),
                'NetAmount': [''],
                'OrganizationId': [this.orgId.toString()],
                'OrderStatus': [1],
                'Status': [1]
            }),
            PurchaseOrderItems: this.rows,
            IsPurchaseReceiveSaved: [false]
        });

        this.form.get('PurchaseOrder.OrganizationId')?.setValue(this.orgId.toString());
    }

    loadDD(index: string) {
        this.control = this.form.get('PurchaseOrderItems.' + index + '.ItemId') as FormControl;
        this.itemFiltered = this.control.valueChanges.pipe(
            startWith(''),
            map(value => (typeof value === 'string' ? value : value.name)),
            map(name => (name ? this._filter(name) : this.itemOptions.slice())),
        );
    }

    emptyTable() {
        while (this.rows.length !== 0) {
            this.rows.removeAt(0);
        }
    }

    deleteRow(index: number) {
        this.rows.removeAt(index);
        this.updateView();
    }

    addRow(d?: TableData, noUpdate?: boolean) {
        const row = this.formBulider.group({
            'LineNo': [d && d.LineNo ? d.LineNo : null, []],
            'Unit': [d && d.Unit ? d.Unit : null, [Validators.required]],
            'ItemId': [d && d.ItemId ? d.ItemId : null, []],
            'WarehouseId': [d && d.WarehouseId ? d.WarehouseId : this.defaultWarehouseId, []],
            'Quantity': [d && d.Quantity ? d.Quantity : 1, [Validators.required]],
            'UnitId': [d && d.UnitId ? d.UnitId : null, []],
            'UnitPrice': [d && d.UnitPrice ? d.UnitPrice : 0, []],
            'NetAmount': [d && d.NetAmount ? d.NetAmount : 0, []],
            'SourceOfOriginName': [d && d.SourceOfOriginName ? d.SourceOfOriginName : '', []],
        });
        this.rows.push(row);
        this.loadDD((this.rows.length - 1).toString());
        if (!noUpdate) {
            this.updateView();
        }
    }

    updateView() {
        this.dataSource.next(this.rows.controls);
    }

    displayFn(item: IItem): string {
        return item && item.Name ? item.Name : '';
    }

    private _filter(name: string): IItem[] {
        const filterValue = name.toLowerCase();

        return this.itemOptions.filter(option => option.Name.toLowerCase().includes(filterValue));
    }

    invoice() {
        const dialogRef = this.dialog.open(ReceiveInvoiceComponent, {
            disableClose: true,
            width: '1400px',
        });

    }

    itemChange(eventValue: any, index: any) {
        console.log(eventValue);
        this.form.get('PurchaseOrderItems.' + index + '.SourceOfOriginName')?.setValue(eventValue?.SourceOfOriginName);
        let c = this.form.get('PurchaseOrderItems.' + index + '.UnitId') as FormControl;

        c.setValue(eventValue?.PurchaseUnitId);

    }

    itemChangeUnit(eventValue: any, index: any) {
        this.form.get('PurchaseOrderItems.' + index + '.Unit')?.setValue(this.UomConvertionAll.filter((d: any) => d.Id == eventValue)[0]?.Name);
    }

    vendorChange(eventValue: any) {
        this.vendorAccount = this.vendorAll.map((d: any) => {
            return d.VendorId == eventValue ? d.AccountNumber : null;
        });
    }

    netAmount(index: string) {
        this.form.get('PurchaseOrderItems.' + index + '.NetAmount')?.setValue((this.form.get('PurchaseOrderItems.' + index + '.UnitPrice')?.value).toFixed(2) * (this.form.get('PurchaseOrderItems.' + index + '.Quantity')?.value).toFixed(2));
        this.totalAmount()
    }

    totalAmount() {
        this._totalAmount = this.form.value.PurchaseOrderItems.reduce((p: number, c: any) => p + Number(c.NetAmount), 0);
    }

    onSubmit() {

        this.form.controls['PurchaseOrderItems'].setValue(this.form.value.PurchaseOrderItems.map((d: any, i = 0) => {
            return {
                ItemId: d.ItemId?.ItemId,
                LineNo: ++i,
                WarehouseId: d.WarehouseId,
                Quantity: d.Quantity,
                UnitId: d.UnitId,
                UnitPrice: d.UnitPrice,
                NetAmount: d.NetAmount,
                Unit: d.Unit,
                SourceOfOriginName: d.SourceOfOriginName
            }
        }));

        this.form.get('PurchaseOrder.NetAmount')?.setValue(this._totalAmount);

        if (!this.form.valid)
            return;
        this.poService.createPO(this.form.value).subscribe((data: any) => {
            this._snackBar.open("Purchase Order Created Successfully!");
            this.router.navigate(['/purchase-order-view', data['Result']]);
        });
    }


}

export interface TableData {
    LineNo: string;
    ItemId: any;
    WarehouseId: string;
    Quantity: number;
    UnitId: string;
    UnitPrice: number;
    NetAmount: string;
    Unit: string;
    SourceOfOriginName: string;
}
