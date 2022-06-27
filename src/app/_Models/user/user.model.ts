export class UserModel {
  Id: number | undefined;
  UserName: string | undefined;
  fFullName: string | undefined;
  Roles: Array<string> | undefined;
  OrganizationIds: number[] = [];
  Permissions : Array<string> = [] ;
}