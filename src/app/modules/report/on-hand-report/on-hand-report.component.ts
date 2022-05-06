import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ItemCategoryService } from '../../item-category/item-category.service';
import { ItemTypesService } from '../../item-types/item-types.service';
import { DetailsComponent } from '../../items/details/details.component';
import { ItemsService } from '../../items/items.service';
import { CreateComponent } from '../../organization/create/create.component';
import { LoginService } from '../../user/login/login.service';
import { WarehouseService } from '../../warehouse/warehouse.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-on-hand-report',
  templateUrl: './on-hand-report.component.html',
  styleUrls: ['./on-hand-report.component.css']
})
export class OnHandReportComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'ItemName', 'On-Hand'];
  dataSource !: any;
  expanded = true;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  frm!: FormGroup;
  control = new FormControl();
  warehouseAll: any;
  workerAll: any;
  orgId: any;
  count: any;
  itemTypes : any;

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private serviceItemCategory: ItemCategoryService,
    private service: ReportService,
    private whService: WarehouseService,
    private serviceLogin: LoginService,
    private iTypeService : ItemTypesService) {

    this.init();
    this.orgId = this.serviceLogin.currentUser()?.OrganizationId;

    this.whService.getWarehouse([this.serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(data => {
      this.warehouseAll = data['Result'];
    });
    this.iTypeService.getItemTypes().subscribe(data => {
      this.itemTypes = data['Result'];
    });
    service.getWorker([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(data => {
      this.workerAll = data['Result'];
    });
  }
  init() {
    this.frm = this.fb.group({
      FromDate: ['', Validators.required],
      ToDate: ['', Validators.required],
      WarehouseId: ['', Validators.required],
      ItemType: [''],
      OrganizationId: [this.serviceLogin.currentUser()?.OrganizationId, Validators.required]
    })
  }
  ngOnInit(): void {
  }
  onSubmit() {

    if (this.frm.invalid)
      return;
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
    this.service.GetOnHandReport(this.frm.value).subscribe(
      data => {
        this.expanded = false;
        this.count = data.Result.length;
        this.dataSource = new MatTableDataSource<IOnHand>(data['Result']);
        this.dataSource.paginator = this.paginator;
        
      })
  }

}
export interface IOnHand {
  ItemId: number;
  ItemName: string;
  OnHand: string;
}
