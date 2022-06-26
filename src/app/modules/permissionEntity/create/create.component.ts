import { Component, Inject, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from "../../user/login/login.service";
import { CategoryService } from "../../category/category.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PermissionEntityService } from "../permissionEntity.service";

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
    addPermissionEntityForm: FormGroup = new FormGroup({});
    isCreate: boolean = false;
    isSaving = false;
    constructor(private formBulider: FormBuilder, private service: PermissionEntityService, private dialogRef: MatDialogRef<CreateComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public info: any, private serviceLogin: LoginService) {
        if (info.ed == null) {
            this.isCreate = true;
        }

        this.addPermissionEntityForm = this.formBulider.group({
            'OrganizationId': [serviceLogin.currentUser()?.OrganizationId],
            'Id': [''],
            'Name': new FormControl('', Validators.required),
        })
    }

    ngOnInit(): void {
        if (!this.isCreate) {
            this.addPermissionEntityForm.patchValue(this.info.ed);
        }
    }

    onSubmit() {
        if (!this.addPermissionEntityForm.valid)
            return;

        this.isSaving = true;
        if (this.isCreate) {
            this.service.createPermissionEntity(this.addPermissionEntityForm.value).subscribe(
                data => {
                    this.isSaving = false;
                    this.dialogRef.close();
                    this._snackBar.open("PermissionEntity Created Successfully!");
                    
                }
            )
        } else {
            this.service.update(this.addPermissionEntityForm.value,this.info.ed.Id).subscribe(
                data => {
                    this.isSaving = false;
                    this.dialogRef.close();
                    this._snackBar.open("PermissionEntity Updated Successfully!");
                }
            )
        }

    }
}
