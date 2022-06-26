import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AddAddressService} from "./add-address.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-add-address',
    templateUrl: './add-address.component.html',
    styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
    frm: FormGroup = new FormGroup({});
    isCreate: boolean = false;

    constructor(private fb: FormBuilder, private service: AddAddressService, private dialogRef: MatDialogRef<AddAddressComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public info: any) {

        if (info.ed == null) {
            this.isCreate = true;
        }


        this.frm = this.fb.group({
            'AddressId': [''],
            'Address1': new FormControl('', Validators.required),
            'Address2': new FormControl('', Validators.required),
            'State': new FormControl('', Validators.required),
            'City': new FormControl('', Validators.required),
            'Pincode': new FormControl('', Validators.required),
            'Phone': new FormControl('', Validators.required),
            'Email': new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {
        if (!this.isCreate) {
            this.frm.patchValue(this.info.ed);
        }
    }


    onSubmit() {

        if (this.isCreate) {

            this.service.createAddress(this.frm.value, this.info.id,this.info.type).subscribe(
                data => {
                    this.dialogRef.close();
                    this._snackBar.open("Address Created Successfully!");
                }
            )
        } else {
            this.service.updateAddress(this.frm.value, this.info.id).subscribe(
                data => {
                    this.dialogRef.close();
                    this._snackBar.open("Address Edited Successfully!");
                }
            )
        }
    }


}
