import {Component, Inject, OnInit} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormArray, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DualListComponent} from "angular-dual-listbox";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../category/category.service";
import {LoginService} from "../../user/login/login.service";
import {ItemsService} from "../../items/items.service";
import {TableData} from "../../purchase-order/purchase-order.component";
import {ItemCategoryService} from "../item-category.service";

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
    tab = 1;
    keepSorted = true;
    key!: string;
    display: any;
    filter = false;
    source!: Array<any>;
    confirmed!: Array<any>;
    userAdd = '';
    disabled = false;
    orgId: string;
    sourceLeft = true;
    format: any = DualListComponent.DEFAULT_FORMAT;

    private sourceStations!: Array<any>;
    private confirmedStations!: Array<any>;


    frm!: FormGroup;
    categoryAll: any;
    itemAll: any;
    loadItems: Array<any> = [];

    isCreate: boolean = false;

    constructor(private dialogRef: MatDialogRef<CreateComponent>, @Inject(MAT_DIALOG_DATA) public info: any, private _snackBar: MatSnackBar, public dialog: MatDialog, private fb: FormBuilder, private serviceCategory: CategoryService, private serviceItem: ItemsService, private service: ItemCategoryService, private serviceLogin: LoginService) {
        this.orgId = [serviceLogin.currentUser()?.OrganizationId].toString();
        if (info.ed == null) {
            this.isCreate = true;
        }

        serviceCategory.getCategory([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(d => {
            this.categoryAll = d['Result'];
        });

        serviceItem.getItem([serviceLogin.currentUser()?.OrganizationId].toString()).subscribe(d => {
            this.itemAll = d['Result'];

            d['Result'].forEach((d: any) => {
                this.loadItems.push({"ItemId": d.ItemId, "Name": d.Name});
            });

            if (!this.isCreate) {
                service.getItemCategoryById(info.ed['ItemCategoryId']).subscribe((data: any) => {

                    data['Result']['ItemCategoryCollections'].forEach((d: any) => {
                        this.confirmedStations.push({"ItemId": d.ItemId, "Name": d.ItemName})
                    });

                    this.loadItems.filter(item1 => this.confirmedStations.some(item2 => item1.ItemId === item2.ItemId))


                })

                this.frm.get('ItemCategory.ItemCategoryId')?.setValue(info.ed['ItemCategoryId']);
                this.frm.get('ItemCategory.CategoryId')?.setValue(info.ed['CategoryId']);
            } else {
                d['Result'].forEach((d: any) => {
                    this.loadItems.push({"ItemId": d.ItemId, "Name": d.Name});
                });

            }
            this.doReset();
        });
    }

    rows: FormArray = this.fb.array([]);

    ngOnInit() {


        this.frm = this.fb.group({
            ItemCategory: this.fb.group({
                ItemCategoryId:[],
                CategoryId: ['', Validators.required],
                OrganizationId: [this.orgId],
            }),
            ItemCategoryCollections: this.rows
        });

        this.doReset();
    }


    addRow(d?: Data) {
        const row = this.fb.group({
            'CategoryId': [d && d.CategoryId ? d.CategoryId : null, []],
            'ItemId': [d && d.ItemId ? d.ItemId : null, []],
        });
        this.rows.push(row);

    }

    onSubmit() {

        if (this.frm.invalid) {
            return;
        }

        this.confirmedStations.forEach((d: Data) => {
            d.CategoryId = this.frm.get('ItemCategory.CategoryId')?.value;
            this.addRow(d)
        })

        if (this.isCreate) {

            this.service.create(this.frm.value).subscribe(d => {
                this.dialogRef.close();
                this._snackBar.open("Item Category Created Successfully!");
            });
        } else {
            this.service.update(this.frm.value).subscribe(d => {
                this.dialogRef.close();
                this._snackBar.open("Item Category Created Successfully!");
            });
        }
    }

    private useStations() {
        this.key = 'ItemId';
        this.display = 'Name';
        this.keepSorted = true;
        this.source = this.sourceStations;
        this.confirmed = this.confirmedStations;
    }


    doReset() {
        this.sourceStations = JSON.parse(JSON.stringify(this.loadItems));
        this.confirmedStations = new Array<any>();

        this.useStations();
    }

    doDelete() {
        if (this.source.length > 0) {
            this.source.splice(0, 1);
        }
    }

    doCreate() {
        if (typeof this.source[0] === 'object') {
            const o = {};
            // @ts-ignore
            o[this.key] = this.source.length + 1;
            // @ts-ignore
            o[this.display] = this.userAdd;
            this.source.push(o);
        } else {
            this.source.push(this.userAdd);
        }
        this.userAdd = '';
    }

    doAdd() {
        for (let i = 0, len = this.source.length; i < len; i += 1) {
            const o = this.source[i];
            const found = this.confirmed.find((e: any) => e === o);
            if (!found) {
                this.confirmed.push(o);
                break;
            }
        }
    }

    doRemove() {
        if (this.confirmed.length > 0) {
            this.confirmed.splice(0, 1);
        }
    }

    doFilter() {
        this.filter = !this.filter;
    }

    filterBtn() {
        return (this.filter ? 'Hide Filter' : 'Show Filter');
    }

    doDisable() {
        this.disabled = !this.disabled;
    }

    disableBtn() {
        return (this.disabled ? 'Enable' : 'Disabled');
    }

    swapDirection() {
        this.sourceLeft = !this.sourceLeft;
        this.format.direction = this.sourceLeft ? DualListComponent.LTR : DualListComponent.RTL;
    }

}

export interface Data {
    CategoryId: string;
    ItemId: string;
}
