import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/authentication/auth.guard';
import { Permission } from 'src/app/shared/common.constant';
import { PurchaseOrderListComponent } from './purchase-order-list.component';

const routes: Routes = [{ path: '', component: PurchaseOrderListComponent,canActivate: [AuthGuard], data: { permissions: [Permission.PurchaseOrder_Create] } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderListRoutingModule { }
