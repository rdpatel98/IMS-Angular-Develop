import { Component, Inject, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from "../../user/login/login.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { VendorService } from "../vendor.service";
import * as moment from "moment";

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
    addvendorForm: FormGroup = new FormGroup({});
    isCreate: boolean = false;
    isSaving = false;
    constructor(private formBulider: FormBuilder, private service: VendorService, private dialogRef: MatDialogRef<CreateComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public info: any, private serviceLogin: LoginService) {
        if (info.ed == null) {
            this.isCreate = true;
        }


        this.addvendorForm = this.formBulider.group({
            'VendorId': [''],
            'OrganizationId': [serviceLogin.currentUser()?.OrganizationId],
            'Id': new FormControl('', Validators.required),
            'Name': new FormControl('', Validators.required),
            'AccountNumber': new FormControl('', Validators.required),
        })
    }

    ngOnInit(): void {
        if (!this.isCreate) {
            this.addvendorForm.patchValue(this.info.ed);
        }
    }

    onSubmit() {
        if (!this.addvendorForm.valid)
            return;

        this.isSaving = true;
        if (this.isCreate) {
            this.service.createVendor({ "Vendor": this.addvendorForm.value }).subscribe(
                data => {
                    this.dialogRef.close();
                    this._snackBar.open("Vendor Created Successfully!");
                    this.isSaving=false;
                }
            )
        } else {
            //console.log(this.addvendorForm.value);
            this.service.update(this.addvendorForm.value).subscribe(
                data => {
                    this.dialogRef.close();
                    this._snackBar.open("Vendor Updated Successfully!");
                    this.isSaving=false;
                }
            )
        }

    }

}
