import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ItemCategoryService } from '../../item-category/item-category.service';
import { LoginService } from '../../user/login/login.service';
import { WarehouseService } from '../../warehouse/warehouse.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-purchase-enquiry-report',
  templateUrl: './purchase-enquiry-report.component.html',
  styleUrls: ['./purchase-enquiry-report.component.css']
})
export class PurchaseEnquiryReportComponent implements OnInit {

  displayedColumns: string[] = ['Date', 'Order no', 'Status','Vendor Name','Amount'];
  dataSource !: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  expanded = true;
  frm!: FormGroup;
  control = new FormControl();
  warehouseAll: any;
  workerAll: any;
  vendorAll : any;
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
    service.getVendors([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(data => {
      this.vendorAll = data['Result'];
    });
  }
  init() {
    this.frm = this.fb.group({
      FromDate: ['', Validators.required],
      ToDate: ['', Validators.required],
      WarehouseId: ['', Validators.required],
      Status: [''],
      VendorName: [''],
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
    this.service.GetPurchaseEnquiryReport(this.frm.value).subscribe(data => {
      this.expanded = false;
      this.dataSource = new MatTableDataSource<IPurchaseEnquiry>(data['Result']);
      this.dataSource.paginator = this.paginator;
      // this.router.navigate(['/item-consumption']);
    })
  }

}
export interface IPurchaseEnquiry {
  Date: string;
  OrderNo: string;
  Status : string;
  VendorName: string;
  Amount : string;
}