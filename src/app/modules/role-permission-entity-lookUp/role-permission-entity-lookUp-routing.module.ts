import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolePermissionEntityLookUpComponent } from './role-permission-entity-lookUp.component';

const routes: Routes = [{ path: '', component: RolePermissionEntityLookUpComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolePermissionEntityLookUpRoutingModule { }
