import { Component, Inject, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from "../../user/login/login.service";
import { UomService } from "../../uom/uom.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UomConvertionService } from "../uom-convertion.service";
import { OrganizationService } from '../../organization/organization.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

interface from_unit {
    value: string;
    viewValue: string;
}

interface to_unit {
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
    isSaving = false;
    isMultipleOrg: boolean = false;
    orgs: any;
    
    addUOMCForm: FormGroup = new FormGroup({});

    constructor(private formBulider: FormBuilder,
                private service: UomConvertionService, 
                private dialogRef: MatDialogRef<CreateComponent>, 
                private _snackBar: MatSnackBar, 
                @Inject(MAT_DIALOG_DATA) public info: any, 
                private uomService: UomService, 
                private serviceLogin: LoginService,
                private orgService: OrganizationService,
                private authService: AuthenticationService) {
        if (info.ed == null) {
            this.isCreate = true;
        }

        uomService.getUOM().subscribe(
            data => {
                this.units = data['Result'];
            });

        this.addUOMCForm = this.formBulider.group({
            'Id': [''],
            'OrganizationId':  new FormControl('', Validators.required),
            'Name': new FormControl('', Validators.required),
            'Description': new FormControl('', Validators.required),
            'FromUnitId': new FormControl('', Validators.required),
            'ToUnitId': new FormControl('', Validators.required),
            'Ratio': new FormControl('', Validators.required),
        })

    }

    ngOnInit(): void {
        if (!this.isCreate) {
            this.addUOMCForm.patchValue(this.info.ed);
        }
        if (this.authService.getCurrentUser().OrganizationIds && this.authService.getCurrentUser().OrganizationIds?.length > 1) {
            this.getOrg();
        }
        else{
            this.addUOMCForm.controls['OrganizationId'].setValue(this.authService.getCurrentUser().OrganizationIds[0]);
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
        if (!this.addUOMCForm.valid)
            return;
        this.isSaving=true;
        if (this.isCreate) {
            this.service.createUomConversion(this.addUOMCForm.value).subscribe(
                data => {
                    this.isSaving=false;
                    this.dialogRef.close();
                    this._snackBar.open("Uom Conversion Created Successfully!");
                }
            )
        } else {
            this.service.update(this.addUOMCForm.value).subscribe(
                data => {
                    this.isSaving=false;
                    this.dialogRef.close();
                    this._snackBar.open("Uom Conversion Updated Successfully!");
                }
            )
        }

    }
}
