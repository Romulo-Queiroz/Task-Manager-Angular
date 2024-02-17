export class userModel {
  id?: number;
  username?: string = '';
  password?: string = '';
  isLogged?: boolean = false;
  isAdmin?: boolean = false;
  profilePicture: string = '';
}
