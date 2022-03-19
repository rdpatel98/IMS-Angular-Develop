import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ItemCategoryService} from "../item-category/item-category.service";
import {LoginService} from "../user/login/login.service";
import {MatPaginator} from "@angular/material/paginator";
import {ItemConsumptionService} from "./item-consumption.service";
import {BehaviorSubject} from "rxjs";
import {WarehouseService} from "../warehouse/warehouse.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-item-consumption',
    templateUrl: './item-consumption.component.html',
    styleUrls: ['./item-consumption.component.css']
})
export class ItemConsumptionComponent implements OnInit {

    // displayedItemColumns: string[] = ['item_code'];
    displayedItemColumns: string[] = ['item_code', 'item_name', 'unit', 'qty', 'onhand'];
    dataItemSource: any;

    survey!: FormGroup;
    myForm!: FormGroup;


    dataSource = new BehaviorSubject<AbstractControl[]>([]);

    listItemCategory: any;

    frm!: FormGroup;
    control = new FormControl();
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    rows: FormArray = this.fb.array([]);
    rowsI: FormArray = this.fb.array([]);
    warehouseAll: any;
    workerAll: any;
    defaultWarehouseId: any;
    orgId: any;

    _rowsOfConsumption: FormArray = this.fb.array([]);


    constructor(private router: Router, private _snackBar: MatSnackBar, private fb: FormBuilder, private serviceItemCategory: ItemCategoryService, private service: ItemConsumptionService, private whService: WarehouseService, private serviceLogin: LoginService) {

        this.orgId =serviceLogin.currentUser()?.OrganizationId;
        this.defaultWarehouseId = serviceLogin.currentUser()?.DefaultWarehouseId;
        service.getItemsWithCategoryByWarehouseId([serviceLogin.currentUser()?.OrganizationId].toString(), [serviceLogin.currentUser()?.DefaultWarehouseId].toString()).subscribe((data: any) => {
            console.log(data['Result']['ConsumptionCategory']);
            this.listItemCategory = data['Result']['ConsumptionCategory'];

            this.listItemCategory.forEach((d: any) => {
                this.addRow(d);
            })
        })


        this.frm = fb.group({
            Consumption: this.fb.group({
                ConsumptionId: [''],
                ConsumptionNo: [''],
                WarehouseId: [''],
                WorkerId: [serviceLogin.currentUser()?.UserId],
                OrganizationId: [serviceLogin.currentUser()?.OrganizationId]

            }),
            ConsumptionCategory: this._rowsOfConsumption
        })


        // this.frm = fb.group({
        //     Consumption: this.fb.group({
        //         ConsumptionCategory: this.rows
        //         // ConsumptionCategory: this.fb.array([this.createItems()])
        //     })
        // });


        service.getPrefixAutoValue([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe((data: any) => {
            this.frm.get('Consumption.ConsumptionNo')?.setValue(data['Result']);
        })

        whService.getWarehouse([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(data => {
            this.warehouseAll = data['Result'];
        });

        service.getWorker([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(data => {
            this.workerAll = data['Result'];
        });
    }

    warehouseChange(whId: any)
    {
        this.rows.clear();
        this._rowsOfConsumption.clear();
        this.service.getItemsWithCategoryByWarehouseId(this.orgId, whId.toString()).subscribe((data: any) => {
            console.log(data['Result']['ConsumptionCategory']);
            this.listItemCategory = data['Result']['ConsumptionCategory'];

            this.listItemCategory.forEach((d: any) => {
                this.addRow(d);
            })
        })
        this.updateView();
    }

    loadItems(data: any) {
        this.rows.clear();
        this.service.getItemsWithOnHandQtyByItemCategoryId(this.listItemCategory[data].ItemCategoryId, this.frm.get('Consumption.WarehouseId')?.value).subscribe(
            data => {
                console.log(data)
                data['Result'].forEach((d: any) => {
                    this.addRow(d);
                })
            }
        )
    }

    selected = new FormControl(0);

    ngOnInit(): void {
        this.frm.get('Consumption.WarehouseId')?.setValue(this.defaultWarehouseId);
    }

    addRow(d?: DTM, noUpdate?: boolean) {

        const rt: FormArray = this.fb.array([]);
        // this._rowsOfItems.clear();
        let i = 1
        d?.ConsumptionItems.forEach((d: any) => {
            const r = this.fb.group({
                'LineNo': [i++],
                'ItemId': [d && d.ItemId ? d.ItemId : null, []],
                'ItemName': [d && d.ItemName ? d.ItemName : null, []],
                'UnitName': [d && d.UnitName ? d.UnitName : 1, []],
                'UnitId': [d && d.UnitId ? d.UnitId : null, []],
                'OnHandQty': [d && d.OnHandQty ? d.OnHandQty : 0, []],
                'CategoryId': [d && d.CategoryId ? d.CategoryId : 0, []],
                'Quantity': [d && d.Quantity ? d.Quantity : 0, []],
            });

            rt.push(r);
        })


        const row = this.fb.group({
            'ItemCategoryId': [d && d.ItemCategoryId ? d.ItemCategoryId : null, []],
            ConsumptionItems: rt,
        });
        this._rowsOfConsumption.push(row);
        // this.loadDD((this.rows.length - 1).toString());
        if (!noUpdate) {
            this.updateView();
        }

    }

    loadItemss(index: number) {

        const dataSource = new BehaviorSubject<AbstractControl[]>([]);

        let d = this.frm.get('ConsumptionCategory.' + index + '.ConsumptionItems') as FormArray;
        dataSource.next(d.controls);
        return dataSource;
    }

    updateView() {
        this.dataSource.next(this._rowsOfConsumption.controls);
    }


    loadDD(index: string) {
        this.control = this.frm.get('ConsumptionCategory.' + index + '.ItemCategoryId') as FormControl;
    }

    onSubmit() {

        console.log(this.frm.value);

        // this.frm.controls['ConsumptionItems'].setValue(this.frm.value.ConsumptionItems.map((d: any, i = 1) => {
        //     return {
        //         LineNo: ++i,
        //         ItemCategoryId: d.ItemCategoryId,
        //         ItemId: d.ItemId,
        //         ItemName: d.ItemName,
        //         UnitName: d.UnitName,
        //         UnitId: d.UnitId,
        //         OnHandQty: d.OnHandQty,
        //         CategoryId: d.CategoryId,
        //         Quantity: d.Quantity,
        //     }
        // }));
        //
        this.service.createItemConsumption(this.frm.value).subscribe((d: any) => {
            this._snackBar.open("Item Consumption submitted Successfully!");
            this.router.navigate(['/item-consumption']);
        })
    }

}

export interface DTM {
    ItemCategoryId: string;
    ConsumptionItems: [IItem];
}

export interface IItem {
    LineNo: string;
    ItemCategoryId: string;
    ItemId: string;
    ItemName: string;
    UnitName: string;
    UnitId: string;
    OnHandQty: string;
    CategoryId: string;
    Quantity: string;
}
