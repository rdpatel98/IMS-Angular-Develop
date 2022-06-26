import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { RolePermissionEntityLookUpService } from './role-permission-entity-lookUp.service';
import { RoleService } from '../role/role.service';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';

@Component({
    selector: 'app-role-permission-entity-lookUp',
    templateUrl: './role-permission-entity-lookUp.component.html',
    styleUrls: ['./role-permission-entity-lookUp.component.css']
})
export class RolePermissionEntityLookUpComponent {
    displayedColumns: string[] = ['Name', 'action'];
    data: any;
    roles: any;
    roleId: any;
    rightList: any;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    config = TreeviewConfig.create({
        hasAllCheckBox: false,
        hasFilter: false,
        hasCollapseExpand: true,
        decoupleChildFromParent: false,
        maxHeight: 500
    });
    rightIdList: any;

    constructor(public dialog: MatDialog,
        private service: RolePermissionEntityLookUpService,
        private _snackBar: MatSnackBar,
        private roleService: RoleService) {
        this.getInit();
        this.roleService.getRoles().subscribe(data => {
            this.roles = data;
        });
    }

    ngOnInit(): void {
    }

    getInit() {
    }
    onChange(roleId: any) {
        this.roleId = roleId;
        this.getData();
    }
    getData() {
        console.log("roleId", this.roleId);
        this.data = this.service.getRoleRightByRole(this.roleId)
            .pipe()
            .subscribe(
                response => {
                    //  
                    console.log("roleId", response);
                    if (response && response.Result == 1) {
                        // this.noItem = false;
                        this.data = response;
                        var lst: any[] = [];
                        response.PermissionList.forEach((item: any) => {
                            var i = mapToTreeViewItem(item)
                            lst.push(i);
                        });
                        this.rightList = lst;
                        console.log("rightList", this.rightList);
                    }
                    else {
                        // this.error = response.result;
                    }
                    // this.loading = false;
                },
                error => {
                    this._snackBar.open("Login Failed. Invalid User Id/Password!");
                });
    }
    save() {
       // this.rightIdList = GetAllItems(this.rightList, this.rightIdList);
        var model = new SaveRolePermissionEntityLookUp();
        model.RoleId = this.roleId;
        model.PermissionEntityLookUps = this.rightIdList;
        console.log("model",model);
        this.service.saveRolePermission(model)
            .subscribe(
                response => {
                    if (response && response == 1) {
                        this._snackBar.open("Permission Saved Successfully!");
                    }
                    else {
                    }
                },
                error => {
                });
    }
}
function mapToTreeViewItem(item: any) {
    var child: any[] = [];
    var result = null;
    if (item.Children) {
        var childItem = null;
        item.Children.forEach((i: any) => {
            childItem = mapToTreeViewItem(i);
            child.push(childItem);
        });
    }
    result = new TreeviewItem({
        checked: item.Checked,
        text: item.Text,
        value: item.Value,
        children: child
    });
    console.log("result", result);
    return result;
};

function GetAllItems(list: any, item: any) {
    var lstItem: Array<any> = item;
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var root = list_1[_i];
        if (root.children != undefined) {
            if (root.internalChecked != false) {
                lstItem.push(root.value);
                for (var _j = 0, _a = root.children; _j < _a.length; _j++) {
                    var child = _a[_j];
                    if (child.internalChecked != false) {
                        lstItem.push(child.value);
                    }
                }
            }
        }
    }
    lstItem = lstItem.filter(distinct);
    lstItem = lstItem.sort(function (a, b) { return a - b });
    return lstItem;
}

const distinct = (value: any, index: any, self: any) => {
    return self.indexOf(value) === index;
}

export class SaveRolePermissionEntityLookUp {
    RoleId: number | undefined;
    PermissionEntityLookUps: number[] | undefined;
}
