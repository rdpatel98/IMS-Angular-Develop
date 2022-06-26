export class UserModel {
  Id: number | undefined;
  UserName: string | undefined;
  fFullName: string | undefined;
  Roles: Array<string> | undefined;
  Organizations:Array<number> | undefined;
  Permissions : Array<string> | [] | undefined;
}