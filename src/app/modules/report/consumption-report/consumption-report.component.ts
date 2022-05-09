import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ItemCategoryService } from '../../item-category/item-category.service';
import { ItemConsumptionService } from '../../item-consumption/item-consumption.service';
import { ItemTypesService } from '../../item-types/item-types.service';
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
    private iTypeService: ItemTypesService) {

    this.init();
    this.orgId = this.serviceLogin.currentUser()?.OrganizationId;

    this.whService.getWarehouse([this.serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(data => {
      this.warehouseAll = data['Result'];
    });
    service.getWorker([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(data => {
      this.workerAll = data['Result'];
    });
    this.iTypeService.getItemTypes().subscribe(data => {
      this.itemTypes = data['Result'];
    });
  }
  init() {
    this.frm = this.fb.group({
      FromDate: ['', Validators.required],
      ToDate: ['', Validators.required],
      WarehouseId: ['', Validators.required],
      ItemType: [''],
      WorkerId: [this.serviceLogin.currentUser()?.UserId],
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
    this.service.GetConsumptionReport(this.frm.value).subscribe(data => {
      console.log('test', data["Result"]);
      this.data = data["Result"];
      this.categories = this.data.ItemCategories;
      this.reports = this.data.Reports;
      console.log('test1', this.data.Reports);
      console.log('report', this.reports);
      console.log('cate', this.categories);
      this.expanded = false;
      // this.router.navigate(['/item-consumption']);
    })
  }


  getCategoryData(categoryData: any[], itemCategoryId: number, categoryId: number) {
    return categoryData.find(x => x.ItemCategoryId === itemCategoryId && x.CategoryId === categoryId)?.Quantity ?? 0;
  }
}
