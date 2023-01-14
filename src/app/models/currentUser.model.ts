export default interface CurrentUser {
  id: number;
  sub: string;
  name: string;
  // exp: number;
  // iat: number;
  // permissions: Array<any>;
  token: string;
}
