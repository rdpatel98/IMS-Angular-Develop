import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
  OnInit,
  Attribute
} from '@angular/core';
import { UserModel } from 'src/app/_Models/user/user.model';
import { PermissionService } from '../services/permissions/permission.service';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {   
  private permissions = [];    

  constructor(
      private permissionSerive:PermissionService,
      private element: ElementRef,
      private templateRef: TemplateRef<any>,
      private viewContainer: ViewContainerRef
  ) {        
  }

  ngOnInit() {


  }

  @Input()
  set hasPermission(val : any) {
      this.permissions = val;
      this.updateView();
  }

  private updateView() {       
      if (this.permissionSerive.isAnyGranted(this.permissions)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
      } else {         
          this.viewContainer.clear();
      }
  }

  // public checkPermission() {
  //     let hasPermission = false;
  //     if (this.currentPermmision) {
  //         for (const checkPermission of this.permissions) {
  //             let permissionFound: Permissions;
  //             if (checkPermission == "hasView") {
  //                 permissionFound = this.currentPermmision.find(x => x.hasView == true && x.code.toUpperCase() == this.pageCode.toUpperCase());
  //             }
  //             if (checkPermission == "hasAddEdit") {
  //                 permissionFound = this.currentPermmision.find(x => x.hasAddEdit == true && x.code.toUpperCase() == this.pageCode.toUpperCase());
  //             }
  //             if (checkPermission == "hasDelete") {
  //                 permissionFound = this.currentPermmision.find(x => x.hasDelete == true && x.code.toUpperCase() == this.pageCode.toUpperCase());
  //             }

  //             if (permissionFound) {
  //                 hasPermission = true;

  //             } else {
  //                 hasPermission = false;
  //             }
  //         }
  //     }

  //     return hasPermission;
  // }
}
