import { Component, Inject, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from "../../user/login/login.service";
import { CategoryService } from "../../category/category.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RoleService } from "../role.service";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { OrganizationService } from '../../organization/organization.service';

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
    addRoleForm: FormGroup = new FormGroup({});
    isCreate: boolean = false;
    isSaving = false;
    isMultipleOrg: boolean = false;
    orgs: any;

    constructor(private formBulider: FormBuilder, private service: RoleService, private dialogRef: MatDialogRef<CreateComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public info: any, private serviceLogin: LoginService, private orgService: OrganizationService,
        private authService: AuthenticationService) {
        if (info.ed == null) {
            this.isCreate = true;
        }

        this.addRoleForm = this.formBulider.group({
            'OrganizationId': new FormControl('', Validators.required),
            'Id': [''],
            'Name': new FormControl('', Validators.required),
        })
    }

    ngOnInit(): void {
       
        if (!this.isCreate) {
            this.addRoleForm.patchValue(this.info.ed);
        }
        if(this.authService.getCurrentUser().OrganizationIds && this.authService.getCurrentUser().OrganizationIds?.length == 0){
            this.getOrg();
           }
        else if (this.authService.getCurrentUser().OrganizationIds && this.authService.getCurrentUser().OrganizationIds?.length > 1) {
            this.getOrg();
        }
        else {
            this.addRoleForm.controls['OrganizationId'].setValue(this.authService.getCurrentUser().OrganizationIds[0]);
        }
    }
    getOrg() {

        this.orgService.getOrganization().subscribe(
            data => {
                this.orgs = data['Result'];
                this.isMultipleOrg = true;
            }
        );
    }
    
    onSubmit() {
        if (!this.addRoleForm.valid)
            return;

        this.isSaving = true;
        if (this.isCreate) {
            this.service.createRole(this.addRoleForm.value).subscribe(
                data => {
                    this.isSaving = false;
                    this.dialogRef.close();
                    this._snackBar.open("Role Created Successfully!");

                },
                error => {
                    this._snackBar.open("Role Name Is Already Exist in System");
                });

        } else {
            this.service.update(this.addRoleForm.value, this.info.ed.Id).subscribe(
                data => {
                    this.isSaving = false;
                    this.dialogRef.close();
                    this._snackBar.open("Role Updated Successfully!");
                },
                error => {
                    this._snackBar.open("Role Name Is Already Exist in System");
                });
        }

    }
}
