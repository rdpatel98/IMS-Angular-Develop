import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AddAddressComponent} from '../../add-address/add-address.component';
import {ActivatedRoute} from "@angular/router";
import {WorkerService} from "../worker.service";
import {IAddress} from "../../organization/view/view.component";
import {AddAddressService} from "../../add-address/add-address.service";
import * as moment from "moment";

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

    addWorkerForm: FormGroup = new FormGroup({});

    displayedColumns: string[] = ['Address1', 'Address2', 'City', 'State', 'Email', 'Phone', 'Pincode', 'action'];


    _id: any;
    data: any;
    dataSource: any;
    addresses!: any;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;


    constructor(public dialog: MatDialog, private formBulider: FormBuilder, private route: ActivatedRoute, private service: WorkerService, private addressService: AddAddressService, private _snackBar: MatSnackBar) {

        this._id = this.route.snapshot.paramMap.get('id');
        this.getData();
    }

    getData() {
        this.service.getWorkerById(this._id).subscribe(
            data => {
                this.data = data['Result']['Worker'];
                this.addresses = data['Result']['Addresses'];
                this.dataSource = new MatTableDataSource<IAddress>(this.addresses);
                this.dataSource.paginator = this.paginator;
            }
        );
    }

    addAddress() {
        const dialogRef = this.dialog.open(AddAddressComponent, {
            disableClose: true,
            data: {id: this._id, ed: null, type: 'AddWorkerAddress'},
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
        console.log(data['AddressId']);
        this.addressService.deleteAddress(data['AddressId']).subscribe(data => {
            this.getData();
            this._snackBar.open("Address Deleted Successfully!");
        })
    }

    returnDate(date: any) {
        return moment(date).format("DD/MM/yyyy")
    }

    ngOnInit(): void {
        this.addWorkerForm = this.formBulider.group({
            'workerName': new FormControl('', Validators.required),
            'personnelNumber': new FormControl('', Validators.required),
            'DOJ': new FormControl('', Validators.required),
            'DOB': new FormControl('', Validators.required),
            'workerUserID': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.required),
        })
    }
}
