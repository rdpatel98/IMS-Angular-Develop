import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../modules/user/login/login.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    showSidebar!: boolean;
    userlogdetails: any;
    constructor(private serviceLogin: LoginService) {
    }

    ngOnInit(): void {
        this.userlogdetails = this.serviceLogin.currentUser();
    }

    logout() {
        this.serviceLogin.logout();
    }

    changeMenu() {
        this.showSidebar = !this.showSidebar;
    }

}
