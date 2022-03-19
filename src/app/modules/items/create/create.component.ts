import {Component, Inject, OnInit} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UomConvertionService} from "../../uom-convertion/uom-convertion.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ItemsService} from "../items.service";
import {LoginService} from "../../user/login/login.service";
import {VendorService} from "../../vendor/vendor.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

interface Purchase_unit {
    value: string;
    viewValue: string;
}

interface Inventory_unit {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    isCreate: boolean = false;
    units: any;
    sourceOfOrigins: any;

    addItemForm: FormGroup = new FormGroup({});

    constructor(private formBulider: FormBuilder, private service: ItemsService, private dialogRef: MatDialogRef<CreateComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public info: any, private uomService: UomConvertionService, private serviceVendor: VendorService, private serviceLogin: LoginService) {

        if (info.ed == null) {
            this.isCreate = true;
        }

        uomService.getUomConversion([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(
            data => {
                this.units = data['Result'];
            });

        serviceVendor.getVendors([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe((data: any) => {
            this.sourceOfOrigins = data['Result'];
        })

        this.addItemForm = this.formBulider.group({
            'ItemId': [0],
            'OrganizationId': [serviceLogin.currentUser()?.OrganizationId],
            'Id': new FormControl(''),
            'ItemNo': new FormControl('', Validators.required),
            'Name': new FormControl('', Validators.required),
            'Description': new FormControl('', Validators.required),
            'PurchaseUnitId': new FormControl('', Validators.required),
            'InventoryUnitId': new FormControl('', Validators.required),
            'MinStock': new FormControl('', Validators.required),
            'MaxStock': new FormControl('', Validators.required),
            'SourceOfOrigin': [],
            'AvgPrice': []
        })
    }

    ngOnInit(): void {
        if (!this.isCreate) {
            this.addItemForm.patchValue(this.info.ed);
        }
    }

    onSubmit() {

        if (this.addItemForm.invalid) {
            return;
        }

        if (this.isCreate) {
            this.service.createItem(this.addItemForm.value).subscribe(
                data => {
                    console.log(data);
                    this.dialogRef.close();
                    this._snackBar.open("Item Created Successfully!");
                }
            )
        } else {
            this.service.update(this.addItemForm.value).subscribe(
                data => {
                    console.log(data);
                    this.dialogRef.close();
                    this._snackBar.open("Item Updated Successfully!");
                }
            )
        }

    }
}
