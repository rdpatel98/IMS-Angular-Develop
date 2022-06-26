import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionEntityComponent } from './permissionEntity.component';

const routes: Routes = [{ path: '', component: PermissionEntityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionEntityRoutingModule { }
