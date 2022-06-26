import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/authentication/auth.guard';
import { ItemConsumptionComponent } from './item-consumption.component';

const routes: Routes = [{ path: '',canActivate: [AuthGuard], component: ItemConsumptionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemConsumptionRoutingModule { }
