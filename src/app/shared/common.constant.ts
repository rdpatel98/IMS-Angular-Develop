export const CommonConstants = {
    "WEBAPI_URL": "http://3.134.18.74:5001/api/",
    "WEBAPI_URL1": "http://3.134.18.74:5001/api/StoreAdmin/AddOrganization",
    "LOGIN_URL": "http://3.134.18.74:5001/"
    // "WEBAPI_URL": "http://ec2-18-188-233-145.us-east-2.compute.amazonaws.com:8080/api/" ,
    // "WEBAPI_URL1": "http://ec2-18-188-233-145.us-east-2.compute.amazonaws.com:8080/api/StoreAdmin/AddOrganization" ,
}

export let OrgId = 0;
export let DefaultWarehouseId = 0;
export enum Permission {
    Organization_List = "Organization.List",
    Organization_Delete = "Organization.Delete",
    Organization_Update = "Organization.Update",
    Organization_Create = "Organization.Create",
    Warehouse_List = "Warehouse.List",
    Warehouse_Delete = "Warehouse.Delete",
    Warehouse_Update = "Warehouse.Update",
    Warehouse_Create = "Warehouse.Create",
    Worker_List = "Worker.List",
    Worker_Delete = "Worker.Delete",
    Worker_Update = "Worker.Update",
    Worker_Create = "Worker.Create",
    LookUp_List = "LookUp.List",
    LookUp_Delete = "LookUp.Delete",
    LookUp_Update = "LookUp.Update",
    LookUp_Create = "LookUp.Create",
    Permission_Entity_List = "Permission_Entity.List",
    Permission_Entity_Delete = "Permission_Entity.Delete",
    Permission_Entity_Update = "Permission_Entity.Update",
    Permission_Entity_Create = "Permission_Entity.Create",
    Role_List = "Role.List",
    Role_Delete = "Role.Delete",
    Role_Update = "Role.Update",
    Role_Create = "Role.Create",
    Role_Permission_Map_List = "Role_Permission_Map.List",
    Role_Permission_Map_Delete = "Role_Permission_Map.Delete",
    Role_Permission_Map_Update = "Role_Permission_Map.Update",
    Role_Permission_Map_Create = "Role_Permission_Map.Create",
    Entity_Lookup_Map_List = "Entity_Lookup_Map.List",
    Entity_Lookup_Map_Delete = "Entity_Lookup_Map.Delete",
    Entity_Lookup_Map_Update = "Entity_Lookup_Map.Update",
    Entity_Lookup_Map_Create = "Entity_Lookup_Map.Create",
    Vendor_List = "Vendor.List",
    Vendor_Delete = "Vendor.Delete",
    Vendor_Update = "Vendor.Update",
    Vendor_Create = "Vendor.Create",
    Category_List = "Category.List",
    Category_Delete = "Category.Delete",
    Category_Update = "Category.Update",
    Category_Create = "Category.Create",
    UOM_List = "UOM.List",
    UOM_Delete = "UOM.Delete",
    UOM_Update = "UOM.Update",
    UOM_Create = "UOM.Create",
    UOM_Conversion_List = "UOM_Conversion.List",
    UOM_Conversion_Delete = "UOM_Conversion.Delete",
    UOM_Conversion_Update = "UOM_Conversion.Update",
    UOM_Conversion_Create = "UOM_Conversion.Create",
    Items_List = "Items.List",
    Items_Delete = "Items.Delete",
    Items_Update = "Items.Update",
    Items_Create = "Items.Create",
    Item_Type_List = "Item_Type.List",
    Item_Type_Delete = "Item_Type.Delete",
    Item_Type_Update = "Item_Type.Update",
    Item_Type_Create = "Item_Type.Create",
    Item_Category_List = "Item_Category.List",
    Item_Category_Delete = "Item_Category.Delete",
    Item_Category_Update = "Item_Category.Update",
    Item_Category_Create = "Item_Category.Create",
    Item_Consumption_List = "Item_Consumption.List",
    Item_Consumption_Delete = "Item_Consumption.Delete",
    Item_Consumption_Update = "Item_Consumption.Update",
    Item_Consumption_Create = "Item_Consumption.Create",
    PurchaseOrder_List = "PurchaseOrder.List",
    PurchaseOrder_Delete = "PurchaseOrder.Delete",
    PurchaseOrder_Update = "PurchaseOrder.Update",
    PurchaseOrder_Create = "PurchaseOrder.Create",
    Inventory_Adjustment_List = "Inventory_Adjustment.List",
    Inventory_Adjustment_Create = "Inventory_Adjustment.Create",
    Consumption_Report_List = "Consumption_Report.List",
    Consumption_Report_Export = "Consumption_Report.Export",
    Consumption_Report_Delete = "Consumption_Report.Delete",
    Consumption_Report_Update = "Consumption_Report.Update",
    Consumption_Report_Create = "Consumption_Report.Create",
    On_Hand_Report_List = "On-Hand_Report.List",
    On_Hand_Report_Delete = "On-Hand_Report.Delete",
    On_Hand_Report_Update = "On-Hand_Report.Update",
    On_Hand_Report_Create = "On-Hand_Report.Create",
    On_Hand_Report_Export = "On-Hand_Report.Export",
    Purchase_Enquiry_Report_List = "Purchase_Enquiry_Report.List",
    Purchase_Enquiry_Report_Delete = "Purchase_Enquiry_Report.Delete",
    Purchase_Enquiry_Report_Update = "Purchase_Enquiry_Report.Update",
    Purchase_Enquiry_Report_Create = "Purchase_Enquiry_Report.Create",
    Purchase_Enquiry_Report_Export = "Purchase_Enquiry_Report.Export"
}