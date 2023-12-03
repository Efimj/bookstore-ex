import { makeAutoObservable } from "mobx";
import IUser from "../interfaces/IAuthor";
import { logIn, logOut, me } from "../api/auth";

class UserStore {
  private _user: IUser | null = null;

  get user(): IUser | null {
    return this._user;
  }

  private set user(newUser: IUser | null) {
    this._user = newUser;
  }

  constructor() {
    makeAutoObservable(this);
  }

  signIn = async (
    email: string,
    password: string,
    remember?: boolean
  ): Promise<boolean> => {
    try {
      await logIn(email.trim(), password.trim(), remember);
      this.user = await me();
    } catch (error) {
      return false;
    }
    return true;
  };

  checkAuth(): boolean {
    if (this._user) return true;
    return false;
  }

  tryRefreshAuth = async (): Promise<boolean> => {
    try {
      this.user = await me();
    } catch (error) {
      return false;
    }
    return true;
  };

  logOutUser = async () => {
    this.user = null;
  };

  logOut = async () => {
    await logOut();
    this.user = null;
  };
}

const userStore = new UserStore();

export default userStore;
