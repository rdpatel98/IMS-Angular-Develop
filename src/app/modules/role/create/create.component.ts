import { Component, Inject, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from "../../user/login/login.service";
import { CategoryService } from "../../category/category.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RoleService } from "../role.service";

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
    constructor(private formBulider: FormBuilder, private service: RoleService, private dialogRef: MatDialogRef<CreateComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public info: any, private serviceLogin: LoginService) {
        if (info.ed == null) {
            this.isCreate = true;
        }

        this.addRoleForm = this.formBulider.group({
            'OrganizationId': [serviceLogin.currentUser()?.OrganizationId],
            'Id': [''],
            'Name': new FormControl('', Validators.required),
        })
    }

    ngOnInit(): void {
        if (!this.isCreate) {
            this.addRoleForm.patchValue(this.info.ed);
        }
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
                    
                }
            )
        } else {
            this.service.update(this.addRoleForm.value,this.info.ed.Id).subscribe(
                data => {
                    this.isSaving = false;
                    this.dialogRef.close();
                    this._snackBar.open("Role Updated Successfully!");
                }
            )
        }

    }
}
