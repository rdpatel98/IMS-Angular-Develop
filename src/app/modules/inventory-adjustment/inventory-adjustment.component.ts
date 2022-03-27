import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { LoginService } from "../user/login/login.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ItemConsumptionService } from '../item-consumption/item-consumption.service';
import { InventoryAdjustmentService } from './inventory-adjustment.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { AbstractControl, FormArray, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, startWith } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { WarehouseService } from "../warehouse/warehouse.service";
import { UomConvertionService } from "../uom-convertion/uom-convertion.service";
import { Router } from "@angular/router";
import { ItemCategoryService } from '../item-category/item-category.service';
import { ItemsService } from '../items/items.service';
import { IItem } from "../items/items.component";

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-inventory-adjustment',
    templateUrl: './inventory-adjustment.component.html',
    styleUrls: ['./inventory-adjustment.component.css']
})
export class InventoryAdjustmentComponent implements OnInit {

    displayedItemColumns: string[] = ['item_code', 'item_name', 'unit', 'qty', 'onhand'];

    items: any;
    userlogdetails: any;
    form: FormGroup = new FormGroup({});
    control = new FormControl();
    itemOptions!: IItem[];
    itemFiltered!: Observable<IItem[]>;
    warehouseAll: any;
    workerAll: any;
    orgId: any;
    data: TableData[] = [{ LineNo: '', ItemId: '', WarehouseId: '', WorkerId: '', Quantity: 0, Reason: '', Unit: '' }];
    dataSource = new BehaviorSubject<AbstractControl[]>([]);
    displayedColumns = ['no', 'item_no', 'qty', 'unit', 'Reason', 'action'];
    defaultWarehouseId: any;
    rows: FormArray = this.formBulider.array([]);

    // form: FormGroup = this.formBulider.group({
    //     'InventoryAdjustment': this.formBulider.group({
    //         'InventoryAdjustmentNo': new FormControl('', Validators.required),
    //         'WarehouseId': new FormControl('', Validators.required),
    //         'WorkerId': new FormControl('', Validators.required),
    //         'OrganizationId': '',
    //         'Status': [1]
    //     }),
    //     InventoryAdjustmentItems: this.rows
    // });

    constructor(private router: Router, private _snackBar: MatSnackBar, private formBulider: FormBuilder, private itemService: ItemsService, private whService: WarehouseService, private uomService: UomConvertionService, private service: InventoryAdjustmentService, private serviceLogin: LoginService) {
        this.defaultWarehouseId = serviceLogin.currentUser()?.DefaultWarehouseId;
        this.orgId = serviceLogin.currentUser()?.OrganizationId;
        this.userlogdetails = serviceLogin.currentUser();
        console.log("justcheck" + this.userlogdetails.DefaultWarehouseId + " " + this.defaultWarehouseId);


        this.form = formBulider.group({
            'InventoryAdjustment': this.formBulider.group({
                'InventoryAdjustmentNo': new FormControl('', Validators.required),
                'WarehouseId': new FormControl('', Validators.required),
                'WorkerId': new FormControl('', Validators.required),
                'OrganizationId': '',
                'Status': [1]
            }),
            InventoryAdjustmentItems: this.rows
        });

        itemService.getItem(this.orgId.toString()).subscribe((data) => {
            this.itemOptions = data['Result'];
            this.data.forEach((d: TableData) => this.addRow(d, false));
            this.updateView();
        });

       

        service.getWorker(this.orgId.toString()).subscribe(data => {
            this.workerAll = data['Result'];
        });

    }

    displayFn(item: IItem): string {
        return item && item.Name ? item.Name : '';
    }

    private _filter(name: string): IItem[] {
        const filterValue = name.toLowerCase();

        return this.itemOptions.filter(option => option.Name.toLowerCase().includes(filterValue));
    }

    ngOnInit(): void {
        this.whService.getWarehouse(this.orgId.toString()).subscribe(data => {
            this.warehouseAll = data['Result'];
            if (this.warehouseAll.length > 0) {
                this.defaultWarehouseId = this.warehouseAll[0].WarehouseId;
                this.form.get('InventoryAdjustment.WarehouseId')?.setValue(this.defaultWarehouseId);
            }
        });
        this.service.getPrefixAutoValue(this.orgId.toString()).subscribe(data => {
            this.form.get('InventoryAdjustment.InventoryAdjustmentNo')?.setValue(data['Result']);
        });
        this.form.get('InventoryAdjustment.OrganizationId')?.setValue(this.orgId);
        // this.form.get('InventoryAdjustment.WarehouseId')?.setValue(this.defaultWarehouseId);
    }

    loadDD(index: string) {
        this.control = this.form.get('InventoryAdjustmentItems.' + index + '.ItemId') as FormControl;
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

    itemChange(eventValue: any, index: any) {

        this.uomService.getUomConversionById(eventValue).subscribe(data => {
            this.form.get('InventoryAdjustmentItems.' + index + '.Unit')?.setValue(data['Result']['Name']);
        });

    }


    addRow(d?: TableData, noUpdate?: boolean) {
        const row = this.formBulider.group({
            'LineNo': [d && d.LineNo ? d.LineNo : null, []],
            'ItemId': [d && d.ItemId ? d.ItemId : null, [Validators.required]],
            'WarehouseId': [d && d.WarehouseId ? d.WarehouseId : null, []],
            'WorkerId': [d && d.WorkerId ? d.WorkerId : null, []],
            'Quantity': [d && d.Quantity ? d.Quantity : 0, [Validators.required]],
            'Reason': [d && d.Reason ? d.Reason : '', []],
            'Unit': [d && d.Unit ? d.Unit : '', []],
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

    onSubmit() {
        
        if (!this.form.valid)
            return;
        this.form.controls['InventoryAdjustmentItems'].setValue(this.form.value.InventoryAdjustmentItems.map((d: any, i = 0) => {
            return {
                ItemId: d.ItemId?.ItemId,
                LineNo: ++i,
                WarehouseId: this.form.get('InventoryAdjustment.WarehouseId')?.value,
                WorkerId: this.form.get('InventoryAdjustment.WorkerId')?.value,
                Quantity: d.Quantity,
                Reason: d.Reason,
                Unit: ''
            }
        }));

        this.service.saveInventoryAdjustment(this.form.value).subscribe((data: any) => {
            this._snackBar.open("Inventory Adjustment Created Successfully!");
            this.router.navigate(['/inventory-adjustment-list']);                        
        });


    }
}


export interface TableData {
    LineNo: string;
    ItemId: any;
    WarehouseId: string;
    WorkerId: string;
    Quantity: number;
    Reason: string;
    Unit?: string;
}
