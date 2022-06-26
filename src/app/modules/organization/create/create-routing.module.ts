import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/authentication/auth.guard';
import { CreateComponent } from './create.component';

const routes: Routes = [{ path: '',canActivate: [AuthGuard], component: CreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule { }
