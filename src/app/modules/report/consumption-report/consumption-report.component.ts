import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ItemCategoryService } from '../../item-category/item-category.service';
import { ItemConsumptionService } from '../../item-consumption/item-consumption.service';
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

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private serviceItemCategory: ItemCategoryService,
    private service: ReportService,
    private whService: WarehouseService,
    private serviceLogin: LoginService) {

    this.init();
    this.orgId = this.serviceLogin.currentUser()?.OrganizationId;

    this.whService.getWarehouse([this.serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(data => {
      this.warehouseAll = data['Result'];
    });
    service.getWorker([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(data => {
      this.workerAll = data['Result'];
    });
  }
  init() {
    this.frm = this.fb.group({
      Consumption: this.fb.group({
        FromDate: ['', Validators.required],
        ToDate: ['', Validators.required],
        WarehouseId: ['', Validators.required],
        ItemType: [''],
        WorkerId: [this.serviceLogin.currentUser()?.UserId],
        OrganizationId: [this.serviceLogin.currentUser()?.OrganizationId, Validators.required]
      })
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
    this.service.GetItemCategoryReport(this.frm.value).subscribe((d: any) => {
      console.log('test');
      // this.router.navigate(['/item-consumption']);
    })
  }

}
