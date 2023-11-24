import { makeAutoObservable } from "mobx";

class UserStore {
  userIsAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  async checkAuth() {}

  async logOut() {}
}

export default new UserStore();
