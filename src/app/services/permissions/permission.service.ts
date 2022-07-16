import { Injectable } from "@angular/core";
import { AuthenticationService } from "../authentication/authentication.service";

@Injectable({
    providedIn: 'root'
})
export class PermissionService {
    permissions: string[] | [];
    constructor(private authenticationService: AuthenticationService) {
        this.permissions = this.authenticationService.getCurrentUser().Permissions || [];
    }

    isGranted(permission: string): boolean {
         
        return this.permissions.some(x => x == permission);
    }

    isAnyGranted(permissions: string[]): boolean {
         
        if (!permissions) {
            return false;
        }

        let isGrant = false;
        permissions.forEach(permission => {
            if (this.isGranted(permission)) {
                isGrant = true;
                return;
            }
        })
        return isGrant;
    }
    getPermission() {
         
        return this.permissions;
    }
}