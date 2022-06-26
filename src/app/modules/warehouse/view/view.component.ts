import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AddAddressComponent} from '../../add-address/add-address.component';
import {WarehouseService} from "../warehouse.service";
import {ActivatedRoute} from "@angular/router";
import {OrganizationService} from "../../organization/organization.service";
import {AddAddressService} from "../../add-address/add-address.service";
import {IAddress} from "../../organization/view/view.component";

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
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css']
})
export class ViewComponent {
    selectedValue!: string;
    warehouseId: warehouseId[] = [
        {value: '0001', viewValue: 'Organization 1'},
        {value: '0002', viewValue: 'Organization 2'},
        {value: '0004', viewValue: 'Organization 3'},
    ];
    warehouseForm: FormGroup = new FormGroup({});
    displayedColumns: string[] = ['Address1', 'Address2', 'City', 'State', 'Email', 'Phone', 'Pincode', 'action'];
    dataSource: any;
    _id: any;
    data: any;
    organizationName!: string;
    addresses!: any;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;


    constructor(public dialog: MatDialog, private formBulider: FormBuilder, private service: WarehouseService, private route: ActivatedRoute, private orgService: OrganizationService, private addressService: AddAddressService, private _snackBar: MatSnackBar) {
        this._id = this.route.snapshot.paramMap.get('id');

        this.getData();
    }

    getData() {

        this.service.getWarehouseById(this._id).subscribe(
            data => {
                this.data = data['Result']['Warehouse'];
                this.orgService.getOrganizationById(data['Result']['Warehouse']['OrganizationId']).subscribe(data => {
                    this.organizationName = data['Result']['Organization']['Name'];
                })
                this.addresses = data['Result']['Addresses'];
                this.dataSource = new MatTableDataSource<IAddress>(this.addresses);
                this.dataSource.paginator = this.paginator;
            }
        );
    }


    addAddress() {

        const dialogRef = this.dialog.open(AddAddressComponent, {
            disableClose: true,
            data: {id: this._id, ed: null, type: 'AddWarehouseAddress'},
            width: '700px',
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getData();
        });


    }

    editAddress(data: any) {
        const dialogRef = this.dialog.open(AddAddressComponent, {
            disableClose: true,
            data: {id: this._id, ed: data},
            width: '700px',
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getData();
        });

    }


    deleteAddress(data: any) {
        //console.log(data['AddressId']);
        this.addressService.deleteAddress(data['AddressId']).subscribe(data => {
            this.getData();
            this._snackBar.open("Address Deleted Successfully!");
        })
    }


    ngOnInit(): void {
        this.warehouseForm = this.formBulider.group({
            'Id': new FormControl('', Validators.required),
            'Name': new FormControl('', Validators.required),
            'warehouseId': new FormControl('', Validators.required),
        })
    }

}


