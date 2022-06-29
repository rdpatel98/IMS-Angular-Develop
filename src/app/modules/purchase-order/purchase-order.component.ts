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
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from '../user/login/login.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { OrganizationService } from '../organization/organization.service';

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

    warehouseAll: any;
    UomConvertionAll: any;
    vendorAll: any;
    _totalAmount: number = 0;

    data: TableData[] = [{ PurchaseOrderItemsId: 0, LineNo: '', Unit: '', ItemId: '', WarehouseId: 0, Quantity: 1, UnitId: '', UnitPrice: 0, NetAmount: 0 }];
    dataSource = new BehaviorSubject<AbstractControl[]>([]);
    displayedColumns = ['no', 'item_no', 'warehouse', 'qty', 'unit', 'unit_price', 'net_amt', 'action'];

    rows: FormArray = this.formBulider.array([]);

    form!: FormGroup;
    isSaving = false;
    isMultipleOrg: boolean = false;
    orgs: any;
    
    constructor(private router: Router, private _snackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute, private formBulider: FormBuilder, public dialog: MatDialog, private itemService: ItemsService, private whService: WarehouseService, private uomService: UomConvertionService, private vendorService: VendorService, private poService: PurchaseOrderService, private serviceLogin: LoginService,private orgService: OrganizationService,
        private authService: AuthenticationService) {
        this.defaultWarehouseId = serviceLogin.currentUser()?.DefaultWarehouseId;

    }

    getPO(id: any) {

        this.poService.getPOByID(id).subscribe((data: any) => {
            const result = {
                'PurchaseOrder': {
                    'PurchaseOrderId': data.Result.PurchaseOrder.PurchaseOrderId,
                    'PurchaseOrderNo': data.Result.PurchaseOrder.PurchaseOrderNo,
                    'VendorId': data.Result.PurchaseOrder.VendorId,
                    'NetAmount': data.Result.PurchaseOrder.NetAmount,
                    'OrganizationId': data.Result.PurchaseOrder.organizationId,
                    'OrderStatus': 1,
                    'Status': 1
                },
                IsPurchaseReceiveSaved: false
            }
            this.vendorChange(data.Result.PurchaseOrder.VendorId);
            this.form.patchValue(result);
            data['Result']['PurchaseOrderItems'].forEach((d: TableData, index: any) => {
                this.addRow(d, undefined, true);
                this.netAmount(index);
            })

        });
    }
    async onInit() {
        if (this.authService.getCurrentUser().OrganizationIds && this.authService.getCurrentUser().OrganizationIds?.length > 1) {
            this.getOrg();
        }
        else{
            this.form.controls['OrganizationId'].setValue(this.authService.getCurrentUser().OrganizationIds[0]);
        }
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.warehouseAll = (await this.whService.getWarehouse().toPromise()).Result;
        if (this.warehouseAll.length > 0) {
            this.defaultWarehouseId = this.warehouseAll[0].WarehouseId;
        }

        this.itemOptions = (await this.itemService.getItem().toPromise()).Result;

        this.updateView();



        this.vendorAll = (await this.vendorService.getVendors().toPromise()).Result;

        this.UomConvertionAll = (await this.uomService.getUomConversion().toPromise()).Result;
        if (id)
            this.getPO(id);
        else {
            this.poService.getPrefixAutoValue().subscribe((data: any) => {
                this.form.get('PurchaseOrder.PurchaseOrderNo')?.setValue(data['Result']);
            })
            this.data.forEach((d: TableData) => this.addRow(d, false));
        }

    }
    getOrg() {

        this.orgService.getOrganization().subscribe(
            data => {
                this.orgs = data['Result'];
                this.isMultipleOrg = true;
            }
        );
    }
    async ngOnInit() {

        // const whs = await this.whService.getWarehouse(this.orgId.toString()).toPromise();
        // this.warehouseAll = whs.Result;
        // if (this.warehouseAll.length > 0) {
        //     this.defaultWarehouseId = this.warehouseAll[0].WarehouseId;
        // }
        this.form = this.formBulider.group({
            'PurchaseOrder': this.formBulider.group({
                'PurchaseOrderId': null,
                'PurchaseOrderNo': new FormControl('', Validators.required),
                'VendorId': new FormControl('', Validators.required),
                'NetAmount': [''],
                'OrganizationId': new FormControl('', Validators.required),
                'OrderStatus': [1],
                'Status': [1]
            }),
            PurchaseOrderItems: this.rows,
            IsPurchaseReceiveSaved: [false]
        });

        // this.form?.get('PurchaseOrder.OrganizationId')?.setValue(this.orgId.toString());


        await this.onInit();

    }

    loadDD(index: string) {
        this.control = this.form?.get('PurchaseOrderItems.' + index + '.ItemId') as FormControl;
        this.itemFiltered = this.control?.valueChanges.pipe(
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

    addRow(d?: TableData, noUpdate?: boolean, forEdit: boolean = false) {
        if (forEdit && d) {
            const item = this.itemOptions?.find(x => x.ItemId == d?.ItemId) ?? null;
            d.ItemId = item;
        }
        const row = this.formBulider.group({
            'PurchaseOrderItemsId': [d && d.PurchaseOrderItemsId ? d.PurchaseOrderItemsId : 0, []],
            'LineNo': [d && d.LineNo ? d.LineNo : null, []],
            'ItemId': [d && d.ItemId ? d.ItemId : null, [Validators.required]],
            'WarehouseId': [d && d.WarehouseId && d.WarehouseId > 0 ? d.WarehouseId : this.defaultWarehouseId, [Validators.required]],
            'Quantity': [d && d.Quantity ? d.Quantity : 1, [Validators.required]],
            'UnitId': [d && d.UnitId ? d.UnitId : null, [Validators.required]],
            'UnitPrice': [d && d.UnitPrice ? d.UnitPrice : 0, [Validators.required]],
            'NetAmount': [d && d.NetAmount ? d.NetAmount : 0, [Validators.required]]
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


        this.poService.getPurchaseOrderUnitPriceByItemId(eventValue.ItemId).subscribe((data: any) => {
            this.form?.get('PurchaseOrderItems.' + index + '.UnitPrice')?.setValue(data.Result);
            this.netAmount(index);
        })
        // this.form?.get('PurchaseOrderItems.' + index + '.SourceOfOriginName')?.setValue(eventValue?.SourceOfOriginName);
        let c = this.form?.get('PurchaseOrderItems.' + index + '.UnitId') as FormControl;

        c.setValue(eventValue?.PurchaseUnitId);

    }

    itemChangeUnit(eventValue: any, index: any) {
        this.form?.get('PurchaseOrderItems.' + index + '.Unit')?.setValue(this.UomConvertionAll.filter((d: any) => d.Id == eventValue)[0]?.Name);
    }

    vendorChange(eventValue: any) {
        this.vendorAccount = this.vendorAll.find((d: any) => d.VendorId == eventValue)?.AccountNumber;
    }

    netAmount(index: string) {
        this.form?.get('PurchaseOrderItems.' + index + '.NetAmount')?.setValue((this.form?.get('PurchaseOrderItems.' + index + '.UnitPrice')?.value).toFixed(2) * (this.form?.get('PurchaseOrderItems.' + index + '.Quantity')?.value).toFixed(2));
        this.totalAmount()
    }

    totalAmount() {
        this._totalAmount = this.form.value.PurchaseOrderItems.reduce((p: number, c: any) => p + Number(c.NetAmount), 0);
    }

    onSubmit() {

        if (!this.form.valid)
            return;

        this.form.controls['PurchaseOrderItems'].setValue(this.form.value.PurchaseOrderItems.map((d: any, i = 0) => {
            return {
                PurchaseOrderItemsId: d?.PurchaseOrderItemsId,
                ItemId: d?.ItemId?.ItemId,
                LineNo: ++i,
                WarehouseId: d.WarehouseId,
                Quantity: d.Quantity,
                UnitId: d.UnitId,
                UnitPrice: d.UnitPrice,
                NetAmount: d.NetAmount
                // ,
                // SourceOfOriginName: d.SourceOfOriginName
            }
        }));

        this.form?.get('PurchaseOrder.NetAmount')?.setValue(this._totalAmount);

        if (this.form.value.PurchaseOrder.PurchaseOrderId && this.form.value.PurchaseOrder.PurchaseOrderId > 0) {
            this.poService.updatePO(this.form.value).subscribe((data: any) => {
                this._snackBar.open("Purchase Order Updated Successfully!");
                this.router.navigate(['/purchase-order-view', data['Result']]);
            });
        }
        else {
            this.poService.createPO(this.form.value).subscribe((data: any) => {
                this._snackBar.open("Purchase Order Created Successfully!");
                this.router.navigate(['/purchase-order-view', data['Result']]);
            });
        }

    }


}

export interface TableData {
    PurchaseOrderItemsId: number | undefined;
    LineNo: string;
    ItemId: any;
    WarehouseId: number;
    Quantity: number;
    UnitId: string;
    UnitPrice: number;
    NetAmount: number;
    Unit: string;
    // SourceOfOriginName: string;
}
