import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PermissionService } from '../permissions/permission.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private permissionService : PermissionService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       
        if (localStorage.getItem('currentUser')) {
             
            if (route.data.permissions) {
                let currentPermmision = this.permissionService.getPermission();
                let permissionFound = currentPermmision.find(x => x.toString().toUpperCase() == route.data.permissions.toString().toUpperCase());
                if (permissionFound) {
                    return true;
                } else {
                  return false;
                    // this.router.navigate(['/forbidden']);
                }
            } 
            if (state.url == "/") {
                this.router.navigate(['/']);
                return false;
            }
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate([''], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
