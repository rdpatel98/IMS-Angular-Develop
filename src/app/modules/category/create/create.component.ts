import { Component, Inject, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CategoryService } from "../category.service";
import * as moment from "moment";
import { LoginService } from "../../user/login/login.service";

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
    addcategoryForm: FormGroup = new FormGroup({});
    isCreate: boolean = false;
    isSaving: boolean = false;
    constructor(private formBulider: FormBuilder, private service: CategoryService, private dialogRef: MatDialogRef<CreateComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public info: any, private serviceLogin: LoginService) {
        if (info.ed == null) {
            this.isCreate = true;
        }

        console.log(serviceLogin.currentUser()?.OrganizationId);

        this.addcategoryForm = this.formBulider.group({
            'CategoryId': [''],
            'OrganizationId': [serviceLogin.currentUser()?.OrganizationId],
            'Id': new FormControl('', Validators.required),
            'Name': new FormControl('', Validators.required),
            'Description': new FormControl('', Validators.required),
        })
    }

    ngOnInit(): void {
        if (!this.isCreate) {
            this.addcategoryForm.patchValue(this.info.ed);
        }
    }

    onSubmit() {
        if (!this.addcategoryForm.valid)
            return;
        this.isSaving = true;

        console.log(this.addcategoryForm.value);
        if (this.isCreate) {
            this.service.createCategory(this.addcategoryForm.value).subscribe(
                data => {
                    this.dialogRef.close();
                    this._snackBar.open("Category Created Successfully!");
                }
            )
        } else {
            this.service.update(this.addcategoryForm.value).subscribe(
                data => {
                    console.log(data);
                    this.dialogRef.close();
                    this._snackBar.open("Category Updated Successfully!");
                }
            )
        }

    }
}
