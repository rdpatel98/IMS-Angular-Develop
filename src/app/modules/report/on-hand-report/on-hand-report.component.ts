import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ItemCategoryService } from '../../item-category/item-category.service';
import { ItemTypeService } from '../../item-type/item-type.service';
import { DetailsComponent } from '../../items/details/details.component';
import { ItemsService } from '../../items/items.service';
import { CreateComponent } from '../../organization/create/create.component';
import { LoginService } from '../../user/login/login.service';
import { WarehouseService } from '../../warehouse/warehouse.service';
import { ReportService } from '../report.service';
import * as xlsx from 'xlsx';
import { Permission } from 'src/app/shared/common.constant';

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
  permission: any = Permission;
  frm!: FormGroup;
  control = new FormControl();
  warehouseAll: any;
  workerAll: any;
  itemAll: any;
  count: any;

  itemTypes: any;

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private serviceItemCategory: ItemCategoryService,
    private service: ReportService,
    private whService: WarehouseService,
    private serviceLogin: LoginService,
    private itemTypeService: ItemTypeService) {

    this.init();

    this.whService.getWarehouse().subscribe(data => {
      this.warehouseAll = data['Result'];
    });
    this.itemTypeService.getItemTypes().subscribe(data => {
      this.itemTypes = data['Result'];
    });
    service.getWorker().subscribe(data => {
      this.workerAll = data['Result'];
    });
    service.getItem().subscribe(data => {
      this.itemAll = data['Result'];
    });
  }
  init() {
    this.frm = this.fb.group({
      // FromDate: ['', Validators.required],
      // ToDate: ['', Validators.required],
      ItemMasterId: [''],
      WarehouseId: ['', Validators.required],
      ItemType: [''],
      OrganizationId: ['', Validators.required]
    })
  }
  ngOnInit(): void {
  }
  exportToExcel() {
    let targetTableElm = document.getElementById("table");
    let wb = xlsx.utils.table_to_book(targetTableElm);
    xlsx.writeFile(wb, "on-hand-report.xlsx");
  }
  onSubmit() {

    if (this.frm.invalid)
      return;
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
