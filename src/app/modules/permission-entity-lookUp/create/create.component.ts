import { Component, Inject, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from "../../user/login/login.service";
import { CategoryService } from "../../category/category.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PermissionEntityLookUpService } from "../permission-entity-lookUp.service";

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
    addPermissionEntityLookUpForm: FormGroup = new FormGroup({});
    isCreate: boolean = false;
    isSaving = false;
    lookups: any;
    permissionEntities: any;

    constructor(private formBulider: FormBuilder, private service: PermissionEntityLookUpService, private dialogRef: MatDialogRef<CreateComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public info: any, private serviceLogin: LoginService) {
        if (info.ed == null) {
             
            this.isCreate = true;
        }
        this.addPermissionEntityLookUpForm = this.formBulider.group({
            'Id': [''],
            'EntityId': new FormControl('', Validators.required),
            'LookUpIds': new FormControl([], Validators.required),
        })
        this.service.getLookups().subscribe(data => {
            this.lookups = data;
        });
        this.service.getEntities().subscribe(data => {
            this.permissionEntities = data;
        });
    }
    compareFn(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }
    ngOnInit(): void {
         
        if (!this.isCreate) {
            this.service.getPermissionEntityLookUpByEntityId(this.info.ed).subscribe(
                res => {
                    this.addPermissionEntityLookUpForm.patchValue(res);
                });
        }
    }

    onSubmit() {
        if (!this.addPermissionEntityLookUpForm.valid)
            return;
         
        this.isSaving = true;
        if (this.isCreate) {
             
            this.service.createPermissionEntityLookUp(this.addPermissionEntityLookUpForm.value).subscribe(
                data => {
                    this.isSaving = false;
                    this.dialogRef.close();
                    this._snackBar.open("Entity LookUp Map Created Successfully!");

                }
            )
        } else {
            this.service.update(this.addPermissionEntityLookUpForm.value).subscribe(
                data => {
                    this.isSaving = false;
                    this.dialogRef.close();
                    this._snackBar.open("Entity LookUp Map Updated Successfully!");
                }
            )
        }

    }
}
