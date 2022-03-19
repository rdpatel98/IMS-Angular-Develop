import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AddAddressComponent} from '../../add-address/add-address.component';
import {IAddress} from "../../organization/view/view.component";
import {ActivatedRoute} from "@angular/router";
import {WorkerService} from "../../worker/worker.service";
import {AddAddressService} from "../../add-address/add-address.service";
import {VendorService} from "../vendor.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css']
})
export class ViewComponent {

    addvendorForm: FormGroup = new FormGroup({});

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    displayedColumns: string[] = ['Address1', 'Address2', 'City', 'State', 'Email', 'Phone', 'Pincode', 'action'];


    _id: any;
    data: any;
    dataSource: any;
    addresses!: any;

    constructor(public dialog: MatDialog, private formBulider: FormBuilder, private route: ActivatedRoute, private service: VendorService, private addressService: AddAddressService, private _snackBar: MatSnackBar) {

        this._id = this.route.snapshot.paramMap.get('id');
        this.getData();
    }

    getData() {
        this.service.getVendorById(this._id).subscribe(
            data => {
                this.data = data['Result']['Vendor'];
                this.addresses = data['Result']['Addresses'];
                this.dataSource = new MatTableDataSource<IAddress>(this.addresses);
                this.dataSource.paginator = this.paginator;
            }
        );
    }


    addAddress() {
        const dialogRef = this.dialog.open(AddAddressComponent, {
            disableClose: true,
            data: {id: this._id, ed: null, type: 'AddVendorAddress'},
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
        this.addressService.deleteAddress(data['AddressId']).subscribe(data => {
            this.getData();
            this._snackBar.open("Address Deleted Successfully!");
        })
    }


    ngOnInit(): void {
        this.addvendorForm = this.formBulider.group({
            'id': new FormControl('', Validators.required),
            'name': new FormControl('', Validators.required),
            'acc_no': new FormControl('', Validators.required),
        })
    }


}

