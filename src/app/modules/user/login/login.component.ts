import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    frm!: FormGroup

    constructor(private fb: FormBuilder, private service: LoginService, private router: Router, private _snackBar: MatSnackBar) {

        this.frm = fb.group({
            UserId: ['', Validators.required],
            Password: ['', Validators.required],
        })
    }

    ngOnInit(): void {
    }

    onSubmit() {

        this.service.login(this.frm.value).subscribe((data: any) => {
            // //console.log(data);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('userName', data.userName);
            if (localStorage.getItem('access_token')) {
                this.gerUserInfo();
            }
            this.router.navigate(['/organization']);
        },
            error => {
                this._snackBar.open("Login Failed. Invalid User Id/Password!");
            });

    }
    gerUserInfo() {
        this.service.setUser().subscribe((data: any) => {
            localStorage.setItem('currentUser', JSON.stringify(data));
        },
            error => {
                this._snackBar.open("Login Failed. Invalid User Id/Password!");
            });

    }
}
