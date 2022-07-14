import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { Permission } from "src/app/shared/common.constant";


@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent implements OnInit {
  isAdmin: boolean = false;
  permission: any = Permission;
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    
    if (this.authService.getCurrentUser().Roles?.find(x=>x = '1')) {
      console.log(this.isAdmin);
      this.isAdmin = true;
    }
  }

}
