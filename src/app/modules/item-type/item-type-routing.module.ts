import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemTypeComponent } from './item-type.component';

const routes: Routes = [{ path: '', component: ItemTypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemTypeRoutingModule { }
