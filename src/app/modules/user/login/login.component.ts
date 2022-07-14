import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    frm!: FormGroup

    constructor(private fb: FormBuilder, private service: LoginService, private router: Router, private _snackBar: MatSnackBar, private authService: AuthenticationService) {

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
        },
            error => {
                this._snackBar.open("Login Failed. Invalid User Id/Password!");
            });

    }
    gerUserInfo() {
        this.service.setUser().subscribe((data: any) => {
            localStorage.setItem('currentUser', JSON.stringify(data));
            if(localStorage.getItem('currentUser')){
                if (this.authService.getCurrentUser().OrganizationIds.length == 0) {
                    this.router.navigate(['/organization']);
                }
                else{
                    this.router.navigate(['/role']);
                }
            }
        },
            error => {
                this._snackBar.open("Login Failed. Invalid User Id/Password!");
            });

    }
}
