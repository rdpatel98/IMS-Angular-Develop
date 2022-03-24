import { Component, Inject, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrganizationService } from "../organization.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { WarehouseService } from "../../warehouse/warehouse.service";
import { LoginService } from "../../user/login/login.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

interface TransactionalWarehouseId {
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
    selectedValue!: string;
    TransactionalWarehouseId: any;
    frm: FormGroup;
    isSaving=false;
    // wh: any;

    constructor(private formBulider: FormBuilder, private service: OrganizationService, private dialogRef: MatDialogRef<CreateComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public info: any, private servicesWH: WarehouseService, private serviceLogin: LoginService) {


        servicesWH.getWarehouse([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe((data: any) => {
            this.TransactionalWarehouseId = data['Result'];
        });


        if (info.ed == null) {
            this.isCreate = true;
        }
        this.frm = this.formBulider.group({
            OrganizationId: [''],
            Id: new FormControl('', Validators.required),
            Name: new FormControl('', Validators.required),
            Description: new FormControl('', Validators.required),
            PurchaseOrderPrefix: new FormControl('', Validators.required),
            ReturnOrderPrefix: new FormControl('', Validators.required),
            InventoryAdjustmentPrefix: new FormControl('', Validators.required),
            ItemConsumptionPrefix: new FormControl('', Validators.required),
            TransactionalWarehouseId: new FormControl(),
            TaxRegistrationNumber: new FormControl('', Validators.required),
        })
    }

    ngOnInit(): void {
        if (!this.isCreate) {
            this.frm.patchValue(this.info.ed);
            this.selectedValue = this.info.ed.TransactionalWarehouseId;
        }
    }


    onSubmit() {
        console.log(this.frm.value);
        if (!this.frm.valid) {
            return;
        }
        this.isSaving=true;
        if (this.isCreate) {

            this.service.createOrganization(this.frm.value).subscribe(
                data => {
                    this.dialogRef.close();
                    this._snackBar.open("Organization Created Successfully!");
                }
            )
        } else {
            this.service.updateOrganization(this.frm.value).subscribe(
                data => {
                    this.dialogRef.close();
                    this._snackBar.open("Organization Updated Successfully!");
                }
            )
        }
    }

}
