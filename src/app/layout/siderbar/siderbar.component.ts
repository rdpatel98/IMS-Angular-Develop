import { Component, OnInit } from "@angular/core";
import { Permission } from "src/app/shared/common.constant";


@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent implements OnInit {

  permission: any = Permission;
  constructor() { }

  ngOnInit(): void {
  }

}
