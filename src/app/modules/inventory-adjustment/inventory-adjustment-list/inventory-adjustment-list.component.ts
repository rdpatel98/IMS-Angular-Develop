import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from '../../user/login/login.service';
import { WarehouseService } from '../../warehouse/warehouse.service';
import { WorkerService } from '../../worker/worker.service';
import { InventoryAdjustmentListService } from './inventory-adjustment-list.service';

@Component({
  selector: 'app-inventory-adjustment-list',
  templateUrl: './inventory-adjustment-list.component.html',
  styleUrls: ['./inventory-adjustment-list.component.css']
})
export class InventoryAdjustmentListComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'InventoryAdjustmentNo', 'WarehouseId', 'WorkerId', 'AdjustmentDate', 'Status', 'action'];
  dataSource !: any;

  warehouses: any[] = [];
  workers: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  orgId: string;
  constructor(public dialog: MatDialog, private workerService: WorkerService, private warehouseService: WarehouseService, private service: InventoryAdjustmentListService, private _snackBar: MatSnackBar, private serviceLogin: LoginService) {

    this.orgId = [serviceLogin.currentUser()?.OrganizationId].toString();
    this.getInit();
  }

  ngOnInit(): void {
    this.getWarehouses();
  }

  getInit() {
    this.service.getInventoryAdjustmentList(this.orgId.toString()).subscribe(
      data => {
        this.dataSource = new MatTableDataSource<IInventoryAdjustment>(data['Result']);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  getWarehouse(id: string): string {
    return this.warehouses.filter((d: any) => d.WarehouseId == id)[0]?.Name;
  }

  getWarehouses() {
    return this.warehouseService.getWarehouse(this.orgId.toString()).subscribe(data => {
      this.warehouses = data['Result'];
    });
  }

  getWorkers(id: string): string {
    return this.workers.filter((d: any) => d.WorkerId == id)[0]?.Name;
  }

  getWoker() {
    return this.workerService.getWorker().subscribe(data => {
      this.workers = data['Result'];
    });
  }

}
export interface IInventoryAdjustment {
  InventoryAdjustmentId: string;
  InventoryAdjustmentNo: string;
  AdjustmentDate: string;
  WorkerId: number;
  WarehouseId: number;
  Status: string;
  OrganizationId: string;
}
