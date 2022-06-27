import { Component, Inject, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from "../../user/login/login.service";
import { CategoryService } from "../../category/category.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ItemTypeService } from "../item-type.service";
import { OrganizationService } from '../../organization/organization.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

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
    addItemTypeForm: FormGroup = new FormGroup({});
    isCreate: boolean = false;
    isSaving = false;
    isMultipleOrg: boolean = false;
    orgs: any;
    
    constructor(private formBulider: FormBuilder, private service: ItemTypeService, private dialogRef: MatDialogRef<CreateComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public info: any, private serviceLogin: LoginService,private orgService: OrganizationService,
    private authService: AuthenticationService) {
        if (info.ed == null) {
            this.isCreate = true;
        }

        this.addItemTypeForm = this.formBulider.group({
            'ItemTypeId': [''],
            'Name': new FormControl('', Validators.required),
            'OrganizationId': new FormControl('', Validators.required),
        })
    }

    ngOnInit(): void {
        if (!this.isCreate) {
            this.addItemTypeForm.patchValue(this.info.ed);
        }
        if (this.authService.getCurrentUser().OrganizationIds && this.authService.getCurrentUser().OrganizationIds?.length > 1) {
            this.getOrg();
        }
        else{
            this.addItemTypeForm.controls['OrganizationId'].setValue(this.authService.getCurrentUser().OrganizationIds[0]);
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
        if (!this.addItemTypeForm.valid)
            return;

        this.isSaving = true;
        if (this.isCreate) {
            this.service.createItemTypes(this.addItemTypeForm.value).subscribe(
                data => {
                    this.isSaving = false;
                    this.dialogRef.close();
                    this._snackBar.open("Item Type Created Successfully!");
                    
                }
            )
        } else {
            this.service.update(this.addItemTypeForm.value).subscribe(
                data => {
                    this.isSaving = false;
                    this.dialogRef.close();
                    this._snackBar.open("Item Type Updated Successfully!");
                }
            )
        }

    }
}
