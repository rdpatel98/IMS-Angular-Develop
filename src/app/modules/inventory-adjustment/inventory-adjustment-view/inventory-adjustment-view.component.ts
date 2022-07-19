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
import { map, startWith } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { TableData } from '../inventory-adjustment.component';
import { InventoryAdjustmentService } from '../inventory-adjustment.service';
import { WorkerService } from '../../worker/worker.service';


@Component({
    selector: 'app-inventory-adjustment-view',
    templateUrl: './inventory-adjustment-view.component.html',
    styleUrls: ['./inventory-adjustment-view.component.css']
})
export class InventoryAdjustmentViewComponent implements OnInit {

    frm: FormGroup = new FormGroup({});

    control = new FormControl();

    streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
    filteredStreets!: Observable<string[]>;
    itemOptions!: IItem[];
    itemFiltered!: Observable<IItem[]>;

    items: any;

    warehouseAll: any;
    UomConvertionAll: any;
    workers: any;
    _totalAmount: number = 0;

    data: TableData[] = [];
    dataSource: any;// = new BehaviorSubject<AbstractControl[]>([]);
    displayedColumns = ['no', 'item_no', 'qty', 'unit', 'reason'];
    _id!: any;
    rows: FormArray = this.formBulider.array([]);
    iaNo: any;
    iaID: any;
    WarehouseName: any;
    WorkerName: any;



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


    constructor(private workerService: WorkerService, private inventoryAdjustment: InventoryAdjustmentService, private formBulider: FormBuilder, private route: ActivatedRoute, public dialog: MatDialog, private itemService: ItemsService, private whService: WarehouseService, private uomService: UomConvertionService, private vendorService: VendorService, private serviceLogin: LoginService) {

        this._id = this.route.snapshot.paramMap.get('id');

        itemService.getItem().subscribe((data) => {
            this.itemOptions = data['Result'];
            // this.data.forEach((d: TableData) => this.addRow(d, false));
            // this.updateView();
        });

        whService.getWarehouse().subscribe(data => {
            this.warehouseAll = data['Result'];
        });

        workerService.getWorker().subscribe(data => {
            this.workers = data['Result'];
        });

        uomService.getUomConversion().subscribe(data => {
            this.UomConvertionAll = data['Result'];
        })


    }


    ngOnInit(): void {
        this.getInit();

    }


    getInit() {

        this.inventoryAdjustment.getIAByID(this._id).subscribe((data: any) => {
            this.dataSource = new MatTableDataSource<TableData>(data['Result']['InventoryAdjustmentItems']);
            this.iaNo = data['Result']['InventoryAdjustment']['InventoryAdjustmentNo'];
            this.iaID = data['Result']['InventoryAdjustment']['InventoryAdjustmentId'];
            var result = data['Result'];
            this.getWH(result.InventoryAdjustment.WarehouseId);
            this.getWorker(result.InventoryAdjustment.WorkerId);
        });
    }


    log(element: any) {
    }




    getItem(ItemId: any): string {
        if (this.itemOptions != undefined) {
            return this.itemOptions.filter((d: any) => d.ItemId == ItemId)[0]?.Name;
        }
        return '';
    }

    getWH(WarehouseId: any) {
        this.whService.getWarehouse().subscribe(data => {
            this.warehouseAll = data['Result'];
            if (this.warehouseAll != undefined) {
                this.WarehouseName = this.warehouseAll.find((d: any) => d.WarehouseId == WarehouseId)?.Name;
            }
        });
    }

    getWorker(workerId: any) {
        this.workerService.getWorker().subscribe(data => {
            this.workers = data['Result'];
            if (this.workers != undefined) {
                this.WorkerName = this.workers.find((d: any) => d.WorkerId == workerId)?.Name;
            }
        });

    }

    getUnit(itemId: any): string {
        if (this.UomConvertionAll != undefined && this.itemOptions != undefined) {
            const InventoryUnitId = this.itemOptions.filter((d: any) => d.ItemId == itemId)[0]?.InventoryUnitId;
            return this.UomConvertionAll.filter((d: any) => d.Id == InventoryUnitId)[0]?.Name;
        }
        return '';
    }
}
