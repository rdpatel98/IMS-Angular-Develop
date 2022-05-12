import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ItemCategoryService } from '../../item-category/item-category.service';
import { ItemConsumptionService } from '../../item-consumption/item-consumption.service';
import { ItemTypeService } from '../../item-type/item-type.service';
import { LoginService } from '../../user/login/login.service';
import { WarehouseService } from '../../warehouse/warehouse.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-consumption-report',
  templateUrl: './consumption-report.component.html',
  styleUrls: ['./consumption-report.component.css']
})
export class ConsumptionReportComponent implements OnInit {

  frm!: FormGroup;
  control = new FormControl();
  warehouseAll: any;
  workerAll: any;
  orgId: any;
  data: any;
  itemTypes: any;
  reports: any[] | undefined;
  categories: any[] | undefined;
  expanded = true;

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private serviceItemCategory: ItemCategoryService,
    private service: ReportService,
    private whService: WarehouseService,
    private serviceLogin: LoginService,
    private itemTypeService: ItemTypeService) {

    this.init();
    this.orgId = this.serviceLogin.currentUser()?.OrganizationId;

    this.whService.getWarehouse([this.serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(data => {
      this.warehouseAll = data['Result'];
    });
    service.getWorker([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(data => {
      this.workerAll = data['Result'];
    });
    this.itemTypeService.getItemTypes().subscribe(data => {
      this.itemTypes = data['Result'];
    });
  }
  init() {
    this.frm = this.fb.group({
      FromDate: ['', Validators.required],
      ToDate: ['', Validators.required],
      WarehouseId: ['', Validators.required],
      ItemType: [''],
      WorkerId: [],
      OrganizationId: [this.serviceLogin.currentUser()?.OrganizationId, Validators.required]
    })
  }
  ngOnInit(): void {
  }
  onSubmit() {

    if (this.frm.invalid)
      return;
    const d = new Date(this.frm.value.FromDate);
    const d1 = new Date(this.frm.value.ToDate);
    // This will return an ISO string matching your local time.
    var data = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();
    var data1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes() - d1.getTimezoneOffset()).toISOString();
    this.frm.value.FromDate = data;
    this.frm.value.ToDate = data1;
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
    this.service.GetConsumptionReport(this.frm.value).subscribe(data => {
      this.data = data["Result"];
      this.categories = this.data.ItemCategories;
      this.reports = this.data.Reports;
      this.expanded = false;
      // this.router.navigate(['/item-consumption']);
    })
  }


  getCategoryData(categoryData: any[], itemCategoryId: number, categoryId: number) {
    return categoryData.find(x => x.ItemCategoryId === itemCategoryId && x.CategoryId === categoryId)?.Quantity ?? 0;
  }
}
