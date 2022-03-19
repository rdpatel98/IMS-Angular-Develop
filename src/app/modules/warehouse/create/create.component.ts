import {Component, Inject, OnInit} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {OrganizationService} from "../../organization/organization.service";
import {WarehouseService} from "../warehouse.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LoginService} from "../../user/login/login.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

interface warehouseId {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    selectedValue!: string;
    organizations!: any;
    isCreate: boolean = false;

    warehouseId: warehouseId[] = [
        {value: '0001', viewValue: 'Organization 1'},
        {value: '0002', viewValue: 'Organization 2'},
        {value: '0004', viewValue: 'Organization 3'},
    ];
    frm: FormGroup = new FormGroup({});

    constructor(private formBulider: FormBuilder, private orgService: OrganizationService, private service: WarehouseService, private dialogRef: MatDialogRef<CreateComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public info: any, private serviceLogin: LoginService) {

        orgService.getOrganization().subscribe(
            data => {
                this.organizations = data['Result'];
            }
        )

        if (info.ed == null) {
            this.isCreate = true;
        }

        this.frm = this.formBulider.group({
            'WarehouseId': [''],
            'Id': new FormControl('', Validators.required),
            'Name': new FormControl('', Validators.required),
            'OrganizationId': [serviceLogin.currentUser()?.OrganizationId],
        })

    }

    ngOnInit(): void {
        if (!this.isCreate) {
            this.frm.patchValue(this.info.ed);
        }

    }

    onSubmit() {

        if (this.isCreate) {

            console.log(this.frm.value);
            this.service.createWarehouse({"Warehouse": this.frm.value}).subscribe(
                data => {
                    this.dialogRef.close();
                    this._snackBar.open("Warehouse Created Successfully!");
                }
            )
        } else {
            this.service.update(this.frm.value).subscribe(
                data => {
                    this.dialogRef.close();
                    this._snackBar.open("Warehouse Updated Successfully!");
                }
            )
        }

        //
        // this.service.createWarehouse({"Warehouse": this.frm.value}).subscribe(
        //     data => {
        //         this.dialogRef.close();
        //         this._snackBar.open("Warehouse Created Successfully!");
        //     }
        // )
    }

}
