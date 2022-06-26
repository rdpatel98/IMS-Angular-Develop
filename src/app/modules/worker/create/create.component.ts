import { Component, Inject, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { WorkerService } from "../worker.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LoginService } from "../../user/login/login.service";
import { OrganizationService } from "../../organization/organization.service";
import { RoleService } from '../../role/role.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    WorkerFrm: FormGroup = new FormGroup({});

    hide: boolean = true;
    isCreate: boolean = false;
    orgs: any;
    roles: any;
    constructor(private serviceOrg: OrganizationService, private formBulider: FormBuilder, private roleService: RoleService, private service: WorkerService, private dialogRef: MatDialogRef<CreateComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public info: any, private serviceLogin: LoginService) {

        if (info.ed == null) {
            this.isCreate = true;
        }

        serviceOrg.getOrganization().subscribe((data: any) => {
            this.orgs = data['Result'];
        });
        this.roleService.getRoles().subscribe(res => {
            this.roles = res;
        });
        this.WorkerFrm = this.formBulider.group({
            'WorkerId': [''],
            'OrganizationId': ['', Validators.required],
            'Name': new FormControl('', Validators.required),
            'PersonnelNumber': new FormControl('', Validators.required),
            'DOJ': new FormControl('', Validators.required),
            'DOB': new FormControl('', Validators.required),
            'UserId': new FormControl('', Validators.required),
            'Password': new FormControl('', Validators.required),
            'IsBlocked': new FormControl(false, Validators.required),
            'RoleId': new FormControl('', Validators.required),
            'Email': new FormControl('', Validators.required),
        });

    }

    ngOnInit(): void {
        if (!this.isCreate) {
            this.WorkerFrm.patchValue(this.info.ed);
        }
    }

    onSubmit() {
         
        this.WorkerFrm.controls['DOJ'].setValue(moment(this.WorkerFrm.value['DOJ']).format("yyyy-MM-DD"));
        this.WorkerFrm.controls['DOB'].setValue(moment(this.WorkerFrm.value['DOB']).format("yyyy-MM-DD"));

        if (this.WorkerFrm.invalid) {
            return;
        }

        if (this.isCreate) {
            this.service.createWorker({ "Worker": this.WorkerFrm.value }).subscribe(
                data => {
                    this.dialogRef.close();
                    this._snackBar.open("Worker Created Successfully!");
                }
            )
        } else {
            this.service.update(this.WorkerFrm.value).subscribe(
                data => {
                    this.dialogRef.close();
                    this._snackBar.open("Worker Updated Successfully!");
                }
            )
        }

    }

}
