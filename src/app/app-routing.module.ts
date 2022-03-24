import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'organization',
        children: [
            { path: '', loadChildren: () => import('./modules/organization/organization.module').then(m => m.OrganizationModule) },
            { path: 'view/:id', loadChildren: () => import('./modules/organization/view/view.module').then(m => m.ViewModule) },
            { path: 'create', loadChildren: () => import('./modules/organization/create/create.module').then(m => m.CreateModule) }
        ]
    },
    {
        path: 'warehouse',
        children: [
            { path: '', loadChildren: () => import('./modules/warehouse/warehouse.module').then(m => m.WarehouseModule) },
            { path: 'view/:id', loadChildren: () => import('./modules/warehouse/view/view.module').then(m => m.ViewModule) },
        ]
    },
    {
        path: 'worker',
        children: [
            { path: '', loadChildren: () => import('./modules/worker/worker.module').then(m => m.WorkerModule) },
            { path: 'view/:id', loadChildren: () => import('./modules/worker/view/view.module').then(m => m.ViewModule) },
        ]
    },
    {
        path: 'vendor',
        children: [
            { path: '', loadChildren: () => import('./modules/vendor/vendor.module').then(m => m.VendorModule) },
            { path: 'view/:id', loadChildren: () => import('./modules/vendor/view/view.module').then(m => m.ViewModule) },
        ]
    },
    { path: 'category', loadChildren: () => import('./modules/category/category.module').then(m => m.CategoryModule) },
    { path: 'uom', loadChildren: () => import('./modules/uom/uom.module').then(m => m.UomModule) },
    { path: 'uom-converstion', loadChildren: () => import('./modules/uom-convertion/uom-convertion.module').then(m => m.UomConvertionModule) },
    { path: 'items', loadChildren: () => import('./modules/items/items.module').then(m => m.ItemsModule) },
    { path: 'item-category', loadChildren: () => import('./modules/item-category/item-category.module').then(m => m.ItemCategoryModule) },
    { path: 'item-consumption', loadChildren: () => import('./modules/item-consumption/item-consumption.module').then(m => m.ItemConsumptionModule) },
    { path: 'purchase-order', loadChildren: () => import('./modules/purchase-order/purchase-order.module').then(m => m.PurchaseOrderModule) },
    { path: 'purchase-order-list', loadChildren: () => import('./modules/purchase-order/purchase-order-list/purchase-order-list.module').then(m => m.PurchaseOrderListModule) },
    { path: 'purchase-order-view/:id', loadChildren: () => import('./modules/purchase-order/purchase-order-view/purchase-order-view.module').then(m => m.PurchaseOrderViewModule) },
    { path: 'inventory-adjustment', loadChildren: () => import('./modules/inventory-adjustment/inventory-adjustment.module').then(m => m.InventoryAdjustmentModule) },
    { path: 'inventory-adjustment-list', loadChildren: () => import('./modules/inventory-adjustment/inventory-adjustment-list/inventory-adjustment-list.module').then(m => m.InventoryAdjustmentListModule) },
    { path: 'inventory-adjustment-view/:id', loadChildren: () => import('./modules/inventory-adjustment/inventory-adjustment-view/inventory-adjustment-view.module').then(m => m.InventoryAdjustmentViewModule) },
    { path: '', loadChildren: () => import('./modules/user/login/login.module').then(m => m.LoginModule) }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
