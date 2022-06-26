import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AddAddressComponent} from '../../add-address/add-address.component';
import {OrganizationService} from "../organization.service";
import {ActivatedRoute} from "@angular/router";
import {IOrganization} from "../organization.component";
import {AddAddressService} from "../../add-address/add-address.service";

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
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css']
})
export class ViewComponent {
    selectedValue!: string;
    TransactionalWarehouseId: TransactionalWarehouseId[] = [
        {value: '0001', viewValue: 'Transactional Warehouse 1'},
        {value: '0002', viewValue: 'Transactional Warehouse 2'},
        {value: '0004', viewValue: 'Transactional Warehouse 3'},
    ];
    addOrganizationForm: FormGroup = new FormGroup({});

    displayedColumns: string[] = ['Address1', 'Address2', 'City', 'State', 'Email', 'Phone', 'Pincode', 'action'];
    dataSource!: any;

    data!: any;
    _id: any;
    addresses!: any;


    @ViewChild(MatPaginator)
    paginator!: MatPaginator;


    constructor(public dialog: MatDialog, private formBulider: FormBuilder, private service: OrganizationService, private route: ActivatedRoute, private addressService: AddAddressService, private _snackBar: MatSnackBar) {

        this._id = this.route.snapshot.paramMap.get('id');

        this.getData();
    }

    getData() {
        this.service.getOrganizationById(this._id).subscribe(
            data => {
                this.data = data['Result']['Organization'];
                this.addresses = data['Result']['Addresses'];
                this.dataSource = new MatTableDataSource<IAddress>(this.addresses);
                this.dataSource.paginator = this.paginator;

                //console.log(data);
            }
        );
    }

    addAddress() {

        const dialogRef = this.dialog.open(AddAddressComponent, {
            disableClose: true,
            data: {id: this._id, ed: null,type: 'AddOrganizationAddress'},
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

    }

}

export interface IAddress {
    Address1: string;
    Address2: string;
    AddressId: string;
    City: string;
    State: string;
    Email: string;
    Phone: string;
    Pincode: string;
    addressId: string;
}


