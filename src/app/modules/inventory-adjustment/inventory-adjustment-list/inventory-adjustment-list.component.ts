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

  displayedColumns: string[] = ['Id', 'InventoryAdjustmentNo', 'WarehouseId', 'WorkerId', 'AdjustmentDate', 'action'];
  dataSource !: any;

  warehouses: any[] = [];
  workers: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private workerService: WorkerService, private warehouseService: WarehouseService, private service: InventoryAdjustmentListService, private _snackBar: MatSnackBar, private serviceLogin: LoginService) {

  }

  ngOnInit(): void {
    this.getWarehouses();
    this.getWokers();
    this.getInit();
  }

  getInit() {
    this.service.getInventoryAdjustmentList().subscribe(
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
    return this.warehouseService.getWarehouse().subscribe(data => {
      this.warehouses = data['Result'];
    });
  }

  getWorker(id: string): string {
    return this.workers.filter((d: any) => d.WorkerId == id)[0]?.Name;
  }

  getWokers() {
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
