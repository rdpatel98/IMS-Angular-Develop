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
import * as xlsx from 'xlsx';
import { Permission } from 'src/app/shared/common.constant';
import { OrganizationService } from '../../organization/organization.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

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
  permission: any = Permission;
  expanded = true;
  frm!: FormGroup;
  control = new FormControl();
  warehouseAll: any;
  workerAll: any;
  vendorAll : any;
  isMultipleOrg: boolean = false;
  orgs: any;

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private serviceItemCategory: ItemCategoryService,
    private service: ReportService,
    private whService: WarehouseService,
    private serviceLogin: LoginService,
    private orgService: OrganizationService,
    private authService: AuthenticationService) {

    this.init();

    this.whService.getWarehouse().subscribe(data => {
      this.warehouseAll = data['Result'];
    });
    service.getVendors().subscribe(data => {
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
      OrganizationId: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    if (this.authService.getCurrentUser().OrganizationIds && this.authService.getCurrentUser().OrganizationIds?.length > 1) {
      this.getOrg();
    }
    else {
      this.frm.controls['OrganizationId'].setValue(this.authService.getCurrentUser().OrganizationIds[0]);
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
  
  exportToExcel() {
    let targetTableElm = document.getElementById("table");
    let wb = xlsx.utils.table_to_book(targetTableElm);
    xlsx.writeFile(wb, "purchase-enquiry-report.xlsx");
   }
  onSubmit() {

    if (this.frm.invalid)
      return;
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